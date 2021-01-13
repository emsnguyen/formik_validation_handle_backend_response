import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
export const CustomImageInput = ({
  field,
  label,
  setFieldValue,
  setPreview
}) => {
  const handleImageChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      setFieldValue(field.name, file);
      let tmpImage = (
        <img
          style={{ maxWidth: "300px", maxHeight: "300px" }}
          src={URL.createObjectURL(file)}
          alt="Avatar"
        />
      );
      setPreview(tmpImage);
    }
  };

  return (
    <FormControl margin="normal">
      <input
        style={{ display: "none" }}
        id="image-upload"
        name={field.name}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <label htmlFor="image-upload">
        <Button
          variant="contained"
          color="primary"
          margin="normal"
          component="span"
        >
          {label}
        </Button>
      </label>
    </FormControl>
  );
};
