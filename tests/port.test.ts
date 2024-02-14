import { test, expect } from "bun:test";
import { parsePort } from "../src/utils.ts";

test("parse port", () => {
    expect(parsePort("8080")).toBe(8080);
    expect(() => parsePort("test")).toThrow("Invalid port: test");
});