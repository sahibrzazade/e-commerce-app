import { Select, MenuItem, FormControl } from '@mui/material';
import { useUrlSort } from '../../hooks/useUrlSort';
import { sortOptions } from '../../constants/sortOptions';
import { getSortMenuProps, getSortSelectSx } from '../../styles/sortOptions';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export const SortOptions = () => {
  const [sortBy, setSortBy] = useUrlSort();
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <FormControl>
      <Select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        displayEmpty
        sx={getSortSelectSx(theme)}
        MenuProps={getSortMenuProps(theme)}
      >
        {sortOptions.map(option => (
          <MenuItem key={option.value} value={option.value} disabled={option.disabled || false}>
            {t(option.labelKey)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
