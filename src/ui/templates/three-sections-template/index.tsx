import React from "react";
import clsx from "clsx";
import classes from "./style.module.css";

interface IThreeSectionsProps {
  header: React.ReactElement;
  list: React.ReactElement;
  content: React.ReactElement;
}

export const ThreeSectionsTemplate: React.FC<IThreeSectionsProps> = (props) => {
  const { header, list, content } = props;

  return (
    <div className={classes.root}>
      <header className={clsx(classes.section, classes.header)}>
        {header}
      </header>
      <aside className={clsx(classes.section, classes.aside)}>{list}</aside>
      <main className={clsx(classes.section, classes.main)}>{content}</main>
    </div>
  );
};
