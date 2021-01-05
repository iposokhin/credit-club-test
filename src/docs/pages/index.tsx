import React, { Fragment } from "react";
import { ThreeSectionsTemplate } from "../../ui";
import { CommonGate } from "../models";
import { DocsList, DocDetail, DocsFilters } from "../organisms";

export const DocsPage: React.FC = () => {
  return (
    <Fragment>
      <CommonGate />
      <ThreeSectionsTemplate
        list={<DocsList />}
        content={<DocDetail />}
        header={<DocsFilters />}
      />
    </Fragment>
  );
};
