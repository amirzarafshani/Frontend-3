import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ProjectsSelect } from "./ProjectsSelect";
import "@testing-library/jest-dom";

describe("Tests TextField Select change", () => {

  test("Changes the selected value", () => {
    const { getAllByRole, getByRole, container } = render(<ProjectsSelect data={[{ "name": "Project 1", "projectId": "project1" }, { "name": "Project 2", "projectId": "project2" }]} value={null} onChange={() => { }} />);

    //CHECK DIV CONTAINER
    let projectsSelectBox = container.querySelector("#projectsSelectBox") as HTMLDivElement;
    expect(projectsSelectBox).toBeInTheDocument();

    // OPEN
    fireEvent.mouseDown(projectsSelectBox);

    //CHECKO OPTIONS
    expect(getByRole("listbox")).not.toEqual(null);
    // screen.debug(getByRole("listbox"));

    //CHANGE
    act(() => {
      const options = getAllByRole("option");
      screen.debug(getAllByRole("option"));
      fireEvent.mouseDown(options[1]);
      options[1].click();
    });

  });
});
