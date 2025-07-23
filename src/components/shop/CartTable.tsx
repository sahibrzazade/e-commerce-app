import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { CartTableProps } from '../../types/cart';
import { useTranslation } from 'react-i18next';

export const CartTable: React.FC<CartTableProps> = ({
  dataSource,
  textSx = {},
  backgroundSx = {},
  updateLoading = false,
  removeLoading = false,
  onQuantityChange,
  onRemove,
}) => {
  const { t } = useTranslation();

  return (
    <TableContainer sx={backgroundSx} className="mb-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={textSx}>{t("common:image")}</TableCell>
            <TableCell sx={textSx}>{t("common:product")}</TableCell>
            <TableCell sx={textSx}>{t("common:price")}</TableCell>
            <TableCell sx={textSx}>{t("common:quantity")}</TableCell>
            <TableCell sx={textSx}>{t("common:subtotal")}</TableCell>
            <TableCell sx={textSx}>{t("common:actions")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map(row => (
            <TableRow key={row.id}>
              <TableCell>
                {row.product && row.product.image ? (
                  <img src={row.product.image} alt={row.product.name} style={{ width: 64, height: 64, objectFit: 'cover' }} />
                ) : null}
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" sx={textSx}>{row.product && row.product.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={textSx}>
                  {row.product ? `$${row.product.price}` : '-'}
                </Typography>
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', borderRadius: 6, width: 100, justifyContent: 'space-between' }}>
                  <IconButton size="small" onClick={() => onQuantityChange(row.id, row.quantity - 1)} disabled={row.quantity <= 1 || updateLoading} sx={textSx}>
                    <AiOutlineMinus />
                  </IconButton>
                  <Typography sx={textSx}>{row.quantity}</Typography>
                  <IconButton size="small" onClick={() => onQuantityChange(row.id, row.quantity + 1)} disabled={updateLoading} sx={textSx}>
                    <AiOutlinePlus />
                  </IconButton>
                </div>
              </TableCell>
              <TableCell>
                <Typography sx={textSx}>
                  {row.product ? `$${(row.product.price * row.quantity).toFixed(2)}` : '-'}
                </Typography>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ height: 40, width: 40, minWidth: 0, padding: 0 }}
                  size="small" onClick={() => onRemove(row.id)}
                  disabled={removeLoading}
                >
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 