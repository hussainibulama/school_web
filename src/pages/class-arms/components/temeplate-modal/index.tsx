import { Box, Typography } from '@mui/material';
import { CheckBox, Modal } from '../../../../components';

import { useSnackbar } from '../../../../hoc';
import { useCreateArms, useGetClassArms } from '../../../../hooks';
import { useEffect, useMemo, useState } from 'react';

interface ICreateUpdateArmProps {
  open: boolean;
  onClose: () => void;
}

export default function TemplateModal({ open, onClose }: ICreateUpdateArmProps) {
  const { data: classArms, isLoading } = useGetClassArms();

  const existingArms = useMemo(() => {
    const classArmsList = classArms?.data ?? [];
    return classArmsList.map((entry: any) => entry.classArmName?.toLowerCase() ?? '');
  }, [classArms]);

  const [addArm, setAddArm] = useState<string[]>([]);

  useEffect(() => {
    setAddArm(existingArms);
  }, [existingArms]);

  const { mutate: createArms, isPending } = useCreateArms();
  const { showSnackbar } = useSnackbar();

  const handleToggle = (label: string) => {
    const lowerLabel = label.toLowerCase();
    setAddArm(
      (prev) =>
        prev.includes(lowerLabel)
          ? prev.filter((item) => item !== lowerLabel) // remove
          : [...prev, lowerLabel], // add
    );
  };

  const handleSubmit = () => {
    // Flatten category items into one array in order, lowercase for matching
    const categoryOrder = category.flatMap((cat) => cat.items.map((item) => item.toLowerCase()));

    // Sort addArm based on index in categoryOrder
    const sortedAddArm = addArm.slice().sort((a, b) => {
      return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
    });

    createArms(
      { arms: sortedAddArm },
      {
        onSuccess: () => {
          showSnackbar('Arms Created Successfully', 'success');
          onClose();
        },
        onError: (err) => {
          showSnackbar(
            err?.response?.data?.message || 'Unable to create arm at the moment',
            'error',
          );
        },
      },
    );
  };

  const category = [
    { title: 'Alphabet', items: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { title: 'Gems and Metals', items: ['Silver', 'Diamond', 'Gold'] },
    { title: 'Colours', items: ['Blue', 'Green', 'Red', 'Indigo', 'Yellow', 'Violet', 'Orange'] },
  ];
  return (
    <Modal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      isLoading={isLoading}
      submitText={'Create Arms'}
      title={`Select Class Arms`}
      error={false}
      maxWidth='xs'
    >
      {category.map((item, index) => (
        <Box key={index} mb={3}>
          <Typography variant='subtitle1' fontWeight={600} mb={1}>
            {item.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1, // spacing between checkboxes
              rowGap: 1.5, // vertical spacing between rows
            }}
          >
            {item.items.map((entry, idx) => {
              const lowerEntry = entry.toLowerCase();
              return (
                <CheckBox
                  key={idx}
                  label={entry}
                  checked={addArm.includes(lowerEntry)} // controlled prop
                  onChange={() => handleToggle(entry)}
                />
              );
            })}
          </Box>
        </Box>
      ))}
    </Modal>
  );
}
