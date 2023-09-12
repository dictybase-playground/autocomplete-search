import { pipe } from "fp-ts/function";
import { map } from "fp-ts/Array";
import { TextField, Chip } from "@material-ui/core";
import { AutocompleteRenderInputParams } from "@material-ui/lab";
import { useState, useEffect } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

const parseTag = ([field, value]: [string, string]) => `${field}: ${value}`;

type useSearchWithRouterProperties = {
  fields: Array<string>;
};

const useSearchWithRouter = ({ fields }: useSearchWithRouterProperties) => {
  const [_, setSearchParameters] = useSearchParams();
  // The current values of the Autocomplete component
  const [selectedFields, setSelectedFields] = useState<Array<string>>([]);

  // The currently selected field
  const [currentField, setCurrentField] = useState("");

  // The key-values of the tags/chips
  // ex: [["Descriptor", "tor"], ["Summary", "antisense"]]
  const [tags, setTags] = useState<Array<[string, string]>>([]);

  const [fieldInputValue, setFieldInputValue] = useState("");

  useEffect(() => {
    // Whenever the `tags` state changes, update the search parameters
    pipe(tags, createSearchParams, setSearchParameters);
  }, [setSearchParameters, tags]);

  const filterExistingTagFields = (options: Array<string>, state) => {
    console.log(state);
    const existingTagFields = pipe(
      tags,
      map(([key]) => key),
    );
    return options.filter((o) => !existingTagFields.includes(o));
  };
  // Fired when the Autocomplete component receives a new value, either selected from the pre-existing options or a "created" value
  const onChange = (_: any, values: Array<string>, reason: string): void => {
    console.log(values, reason);
    switch (reason) {
      // reason === "select-option" when: clicking on option or pressing `ENTER` on highlighted option
      case "select-option":
        // 1) clear current input, no matter what
        setFieldInputValue("");
        // 2) set the selected fields
        setSelectedFields(values);
        // 3) set the current field value to the last value
        console.log("current field", values[0]);
        setCurrentField(values.at(-1) || "");
        break;
      // reason === "create-option" when: pressing `ENTER` in Textfield
      case "create-option":
        break;
      default:
        break;
    }
  };

  const onInputChange = () => {};
  /**
   * Callback when a chip is removed from the search input
   */
  const onDeleteChip = (chipValue: string) => {};

  /**
   * Callback for rendering the chips
   */
  const renderTags = () => (
    <>
      {console.log(currentField)}
      {pipe(
        tags,
        map((o) => (
          <Chip
            onDelete={() => {}}
            size="small"
            key={o[0]}
            label={parseTag(o)}
          />
        )),
      )}
      {`${currentField}: `}
    </>
  );

  /**
   * Callback for rendering the search box
   */
  const renderInput = (parameters: AutocompleteRenderInputParams) => (
    <TextField
      {...parameters}
      size="medium"
      // label={label}
      variant="outlined"
      fullWidth
    />
  );

  return {
    selectedFields,
    currentField,
    fieldInputValue,
    filterExistingTagFields,
    onChange,
    onInputChange,
    renderTags,
    renderInput,
  };
};

export { useSearchWithRouter };
