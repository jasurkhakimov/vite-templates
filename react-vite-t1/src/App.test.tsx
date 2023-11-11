import App from "@/App";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("App tests", () => {
  render(<App />);
  it("Heading", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Awesome vite"
    );
  });
});
