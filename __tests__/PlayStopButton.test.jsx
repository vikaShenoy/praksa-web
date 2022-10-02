import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import PlayStopButton from "../components/buttons/PlayStopButton";

// TODO
describe("PlayStopButton component", () => {
  let mockOnClick = jest.fn();
  
  beforeEach(() => {
    render(
      <ThemeProvider>
        <PlayStopButton isPlaying={false} onClick={mockOnClick} />
      </ThemeProvider>
    )
  });

  it("", () => {});

  it("", () => {});

  it("", () => {});
});