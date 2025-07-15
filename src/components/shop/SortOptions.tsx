import { Select, MenuItem, FormControl } from '@mui/material';
import { useUrlSort } from '../../hooks/useUrlSort';
import { sortOptions } from '../../constants/sortOptions';
import { sortMenuProps, sortSelectSx } from '../../styles/sortOptions';

export const SortOptions = () => {
  const [sortBy, setSortBy] = useUrlSort();

  return (
    <FormControl>
      <Select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        displayEmpty
        sx={sortSelectSx}
        MenuProps={sortMenuProps}
      >
        {sortOptions.map(option => (
          <MenuItem key={option.value} value={option.value} disabled={option.disabled || false}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
