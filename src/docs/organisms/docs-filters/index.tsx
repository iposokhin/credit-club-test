import React from "react";
import { useStore } from "effector-react";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import { compose, sizing, spacing, flexbox } from "@material-ui/system";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import {
  changeCategory,
  changeSearch,
  changeParticipant,
  $participants,
  $category,
  $search,
  $participant,
} from "../../models";

const FiltersToolbar = styled(Grid)(compose(sizing, spacing));
const FlexRadioGroup = styled(RadioGroup)(flexbox);

const DocsParicipantsSelect: React.FC = (props) => {
  const options = useStore($participants);
  const value = useStore($participant);

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="participants-label">Signed by</InputLabel>
      <Select
        labelWidth={70}
        labelId="participants-label"
        value={value}
        onChange={(e) => changeParticipant(e.target.value as string)}
      >
        {options.map((i) => (
          <MenuItem key={i.id} value={i.id}>{`${i.firstname} ${i.lastname}`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const DocsSearch: React.FC = (props) => {
  const search = useStore($search);

  return (
    <TextField variant="outlined" placeholder="Search" value={search} onChange={(e) => changeSearch(e.target.value)} />
  );
};

const DocsCategory: React.FC = (props) => {
  const category = useStore($category);

  return (
    <FormControl component="fieldset">
      <FlexRadioGroup
        flexDirection="row"
        name="category"
        value={category}
        onChange={(e) => changeCategory(e.target.value)}
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="mine" control={<Radio />} label="By me" />
      </FlexRadioGroup>
    </FormControl>
  );
};

export const DocsFilters: React.FC = (props) => {
  return (
    <FiltersToolbar container height="100%" width="100%" px={2} alignItems="center">
      <Grid item xs={4}>
        <DocsCategory />
      </Grid>
      <Grid item xs={4}>
        <DocsSearch />
      </Grid>
      <Grid item xs={4}>
        <DocsParicipantsSelect />
      </Grid>
    </FiltersToolbar>
  );
};
