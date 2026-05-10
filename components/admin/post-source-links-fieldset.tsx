"use client";

import { useState } from "react";

interface LinkRow {
  id: number;
}

const initialRows: LinkRow[] = [{ id: 0 }];

export function PostSourceLinksFieldset() {
  const [rows, setRows] = useState(initialRows);

  function addRow() {
    setRows((currentRows) => {
      const nextId =
        currentRows.reduce((maxId, row) => Math.max(maxId, row.id), -1) + 1;

      return [...currentRows, { id: nextId }];
    });
  }

  function removeRow(id: number) {
    setRows((currentRows) => {
      if (currentRows.length === 1) {
        return currentRows;
      }

      return currentRows.filter((row) => row.id !== id);
    });
  }

  return (
    <fieldset className="space-y-4 lg:col-span-2">
      <legend className="text-sm font-medium text-stone-700">
        Sources &amp; links
      </legend>
      <div className="space-y-2">
        <p className="text-sm leading-6 text-stone-500">
          Add one or more external references for the original content,
          documentation, or related resources. Empty rows are ignored.
        </p>
      </div>

      <div className="space-y-4">
        {rows.map((row, index) => (
          <div
            key={row.id}
            className="rounded-[1.25rem] border border-black/10 bg-stone-50 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-stone-700">
                Link {index + 1}
              </p>
              {rows.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  className="text-sm font-medium text-stone-500 transition hover:text-red-600"
                >
                  Remove
                </button>
              ) : null}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-stone-700">Label</span>
                <input
                  type="text"
                  name="sourceLinkLabel"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500"
                  placeholder="Original article"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-stone-700">URL</span>
                <input
                  type="url"
                  name="sourceLinkUrl"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500"
                  placeholder="https://example.com/article"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="inline-flex items-center rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
      >
        Add another link
      </button>
    </fieldset>
  );
}
