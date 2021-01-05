import React from "react";
import { useStore } from "effector-react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import { compose, spacing } from "@material-ui/system";

import { useSignStyles, SignIcon } from "../../../ui";

import { Document } from "../../api";

import { $opened } from "../../models";

const StyledBox = styled(Box)(compose(spacing));
const StyledChip = styled(Chip)(compose(spacing));

type ParticipantsSectionProps = Pick<Document, "participants">;

const ParticipantsSection: React.FC<ParticipantsSectionProps> = (props) => {
  const { participants } = props;

  const { sign, unsign } = useSignStyles();

  if (!participants.length) {
    return null;
  }

  return (
    <StyledBox component="section" px={6} mb={6}>
      <Typography variant="h3">Participants</Typography>
      <Grid container component="ul" spacing={2}>
        {participants.map((i) => {
          const isSigned = !!i.signedDate;

          return (
            <Grid item component="li" key={i.id}>
              <StyledChip
                px={1}
                className={isSigned ? sign : unsign}
                label={`${i.firstname} ${i.lastname}`}
                icon={<SignIcon isSigned={isSigned} />}
              />
            </Grid>
          );
        })}
      </Grid>
    </StyledBox>
  );
};

type InfoSectionProps = Pick<Document, "signedDate">;

const InfoSection: React.FC<InfoSectionProps> = (props) => {
  const isSigned = !!props.signedDate;

  return (
    <StyledBox component="section" px={6} mb={6}>
      <Typography variant="h3">Info about document</Typography>
      <Typography variant="body1">Status: {isSigned ? "signed" : "unsigned"}</Typography>
      {isSigned && (
        <Typography variant="body1">Sign date: {(props.signedDate as Date).toLocaleDateString()}</Typography>
      )}
    </StyledBox>
  );
};

export const DocDetail: React.FC = (props) => {
  const opened = useStore($opened);

  if (!opened) {
    return null;
  }

  return (
    <article>
      <StyledBox component="header" px={3} my={3}>
        <Typography variant="h2">{opened.title}</Typography>
      </StyledBox>
      <ParticipantsSection participants={opened.participants} />
      <InfoSection signedDate={opened.signedDate} />
    </article>
  );
};
