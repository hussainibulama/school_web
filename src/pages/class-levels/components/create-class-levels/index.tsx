import { Box, Typography } from '@mui/material';
import { CheckBox, Modal } from '../../../../components';

import { useSnackbar } from '../../../../hoc';
import {
  useCreateSchoolClass,
  useGetClassArms,
  useGetGeneralClass,
  useGetSchoolClass,
} from '../../../../hooks';
import { useEffect, useState, useMemo, useRef } from 'react';

interface ICreateClassLevelsProps {
  open: boolean;
  onClose: () => void;
  isOnboarding?: boolean;
}

export default function CreateClassLevels({
  open,
  onClose,
  isOnboarding,
}: ICreateClassLevelsProps) {
  const { data: classArms, isLoading } = useGetClassArms();
  const { data: classes, isLoading: _isLoading } = useGetGeneralClass();
  const { data: schoolClasses, isLoading: __isLoading } = useGetSchoolClass();

  // Arms array uppercase and memoized
  const arms = useMemo(
    () => classArms?.data?.map((a: any) => a.classArmName?.toUpperCase?.()) ?? [],
    [classArms],
  );

  // Class list uppercase and memoized
  const classList = useMemo(
    () => classes?.data?.map((c: any) => c.classId?.toUpperCase?.()) ?? [],
    [classes],
  );

  // Parse schoolClasses for initial selection
  // Parse schoolClasses for initial selection
  const initialSelection = useMemo(() => {
    if (!schoolClasses?.data) {
      return { selected: [], map: new Map<string, string[]>() };
    }

    const selected = new Set<string>();
    const map = new Map<string, string[]>();

    schoolClasses.data.forEach((sc: any) => {
      const classId = sc.classId?.toUpperCase();
      if (!classId) return;

      selected.add(classId);

      const labelParts = sc.label?.trim().split(' ') ?? [];
      const possibleArm =
        labelParts.length > 0 ? labelParts[labelParts.length - 1]?.toUpperCase() : '';

      if (arms.length && possibleArm && arms.includes(possibleArm)) {
        const existing = map.get(classId);
        if (existing) {
          if (!existing.includes(possibleArm)) {
            existing.push(possibleArm);
            map.set(classId, existing);
          }
        } else {
          map.set(classId, [possibleArm]);
        }
      } else if (arms.length) {
        const existing = map.get(classId);
        if (!existing || existing.length === 0) {
          map.set(classId, [arms[0]]);
        }
      }
    });

    return { selected: Array.from(selected), map };
  }, [schoolClasses, arms]);

  // Refs and states
  const initializedRef = useRef(false);

  // Use state for classes selected and map for arms per class
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [classToArmsMap, setClassToArmsMap] = useState<Map<string, string[]>>(new Map());

  // Initialize once on modal open
  useEffect(() => {
    if (open && !initializedRef.current) {
      setSelectedClasses(initialSelection.selected);
      setClassToArmsMap(initialSelection.map);
      initializedRef.current = true;
    }
  }, [open, initialSelection]);

  // Reset on modal close
  useEffect(() => {
    if (!open) {
      initializedRef.current = false;
      setSelectedClasses([]);
      setClassToArmsMap(new Map());
    }
  }, [open]);

  const { mutate: createSchoolClass, isPending } = useCreateSchoolClass();
  const { showSnackbar } = useSnackbar();

  // Helpers for working with Map in state (need to clone Map for React state update)
  const setMapValue = (map: Map<string, string[]>, key: string, value: string[] | undefined) => {
    const newMap = new Map(map);
    if (value === undefined) {
      newMap.delete(key);
    } else {
      newMap.set(key, value);
    }
    return newMap;
  };

  // Toggle class selection
  const handleToggleClass = (classId: string) => {
    // If class was preselected, do NOT allow unchecking
    if (initialSelection.selected.includes(classId)) return;

    setSelectedClasses((prev) => {
      const isSelected = prev.includes(classId);
      let updated: string[];
      if (isSelected) {
        updated = prev.filter((c) => c !== classId);
        setClassToArmsMap((prevMap) => setMapValue(prevMap, classId, undefined));
      } else {
        updated = [...prev, classId];
        // Add all arms by default for newly selected class
        setClassToArmsMap((prevMap) => setMapValue(prevMap, classId, [...arms]));
      }
      return updated;
    });
  };

  // Toggle arm selection for a class
  const handleToggleArm = (classId: string, arm: string) => {
    // Disable toggle if arm is preselected
    const preselectedArms = initialSelection.map.get(classId) ?? [];
    if (preselectedArms.includes(arm)) return;

    setClassToArmsMap((prev) => {
      const currentArms = prev.get(classId) ?? [];
      const updatedArms = currentArms.includes(arm)
        ? currentArms.filter((a) => a !== arm)
        : [...currentArms, arm];
      return setMapValue(prev, classId, updatedArms);
    });
  };

  // Submit handler
  const handleSubmit = () => {
    // Payload: array of { classId, arms[] }
    // Include all preselected classes, arms can be empty array if no arms
    // const payload = Array.from(classToArmsMap.entries()).map(([classId, arms]) => ({
    //   classId,
    //   arms,
    // }));

    const classListData = classes?.data ?? [];
    const payloads = Array.from(classToArmsMap.entries()).flatMap(([classId, arms]) => {
      // Find class info by classId (case-insensitive)

      const classInfo = classListData.find(
        (c: any) => c.classId.toLowerCase() === classId.toLowerCase(),
      );

      if (!classInfo) {
        // If not found, fallback to classId only with empty labels
        return [];
      }

      // If arms array is empty or undefined, just return one object with className only
      if (!arms || arms.length === 0) {
        return [
          {
            classId: classInfo.classId,
            label: classInfo.className,
          },
        ];
      }

      // Else map each arm to a label combining className + arm
      return arms.map((arm) => ({
        classId: classInfo.classId,
        label: `${classInfo.className} ${arm}`,
      }));
    });

    // Also include preselected classes that might not be in the map (no arms)
    // initialSelection.selected.forEach((classId) => {
    //   if (!classToArmsMap.has(classId)) {
    //     payload.push({ classId, arms: [] });
    //   }
    // });
    createSchoolClass(payloads, {
      onSuccess: () => {
        showSnackbar('Classes Created Successfully', 'success');
        onClose();
      },
      onError: (err) => {
        showSnackbar(err?.response?.data?.message || 'Unable to create arm at the moment', 'error');
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={
        isOnboarding
          ? () => {
              /* intentionally empty */
            }
          : onClose
      }
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      isLoading={isLoading || _isLoading || __isLoading}
      submitText='Create Levels'
      title='Create Class Levels'
      error={false}
      maxWidth='xs'
    >
      {/* Arms section hidden if no arms configured */}
      {arms.length > 0 && (
        <Box mb={3}>
          <Typography variant='subtitle1' fontWeight={600} mb={1}>
            Arms
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, rowGap: 1.5 }}>
            {arms.map((arm: any, idx: any) => (
              <CheckBox key={idx} label={arm} disabled checked />
            ))}
          </Box>
        </Box>
      )}

      {/* Classes */}
      <Box mb={3}>
        <Typography variant='subtitle1' fontWeight={600} mb={1}>
          Classes
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, rowGap: 1.5 }}>
          {classList.map((classId: any, idx: any) => {
            const isPreselected = initialSelection.selected.includes(classId);
            return (
              <CheckBox
                key={idx}
                label={classId}
                checked={selectedClasses.includes(classId)}
                onChange={() => handleToggleClass(classId)}
                disabled={isPreselected} // Disable unchecking preselected classes
              />
            );
          })}
        </Box>
      </Box>

      {/* School Classes — Arms per class (only if arms exist) */}
      {arms.length > 0 && (
        <Box mb={3}>
          <Typography variant='subtitle1' fontWeight={600} mb={1}>
            School Classes
          </Typography>
          {selectedClasses.length === 0 && (
            <Typography variant='body2' color='textSecondary'>
              Select a class above to choose its arms.
            </Typography>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, rowGap: 1.5 }}>
            {selectedClasses.map((classId, idx) => (
              <Box key={idx} mb={2}>
                <Typography variant='subtitle2' fontWeight={500} mb={1}>
                  {classId}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, rowGap: 1.5 }}>
                  {arms.map((arm: any, i: any) => {
                    const preselectedArms = initialSelection.map.get(classId) ?? [];
                    const isPreselectedArm = preselectedArms.includes(arm);

                    return (
                      <CheckBox
                        key={i}
                        label={arm}
                        checked={classToArmsMap.get(classId)?.includes(arm) ?? false}
                        onChange={() => handleToggleArm(classId, arm)}
                        disabled={isPreselectedArm} // disable if preselected
                      />
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Modal>
  );
}
