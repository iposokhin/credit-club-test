import React from "react";
import { useStore, useStoreMap } from "effector-react";
import format from "date-fns/format";

import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import { useSignStyles, SignIcon } from "../../../ui";

import { $documents, $openedId, open } from "../../models";

const DocItem: React.FC<ListChildComponentProps> = (props) => {
  const { index, style } = props;

  const classes = useSignStyles();
  const openedId = useStore($openedId);
  const { id, title, signedDate } = useStoreMap({
    store: $documents,
    keys: [],
    fn: (documents) => documents[index],
  });

  const selected = openedId === id;
  const isSigned = signedDate instanceof Date;
  const avatarColor = isSigned ? classes.sign : classes.unsign;
  const dateStrOrNull = isSigned ? format(signedDate as Date, "dd.MM.yyyy HH:mm") : null;

  const openDocument = () => open(id);

  return (
    <ListItem button onClick={openDocument} selected={selected} component="li" style={style}>
      <ListItemAvatar>
        <Avatar className={avatarColor}>
          <SignIcon isSigned={isSigned} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={dateStrOrNull} />
    </ListItem>
  );
};

export const DocsList: React.FC = (props) => {
  const documents = useStore($documents);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List innerElementType="ul" height={height} itemCount={documents.length} itemSize={120} width={width}>
          {DocItem}
        </List>
      )}
    </AutoSizer>
  );
};
