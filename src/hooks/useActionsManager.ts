import React, { useState } from 'react';

export default function useActionsManager<T extends { type: string | undefined }>() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [actionType, setActionType] = useState<T>({ type: undefined } as T);

  const handleResetAction = () => {
    setActionType({ type: undefined } as T);
  };

  const closeModal = () => {
    setOpenModal(false);
    handleResetAction();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, rowId: number) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const handleOpenModalWithType = (type: T['type'], payload: Omit<T, 'type'> = {} as any) => {
    setActionType({ type, ...payload } as T);
    setOpenModal(true);
    handleMenuClose();
  };

  return {
    anchorEl,
    menuRowId,
    openModal,
    actionType,
    handleMenuOpen,
    handleMenuClose,
    handleOpenModalWithType,
    closeModal,
    setOpenModal,
  };
}
