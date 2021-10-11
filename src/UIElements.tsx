import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { db } from ".";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import AwesomeDebouncePromise from "awesome-debounce-promise";

function Elements() {
  const defaultDelayInMillis = 5000; // default delay 5 seconds

  const [dbValue, setDBValue] = useState("");
  const [delayFieldDisabled, setdelayFieldDisabled] = useState(true)
  const [debounceDelay, setDebounceDelay] = useState(defaultDelayInMillis)

  const collectionLabel = "data";
  const documentLabel = "doc";

  useEffect(() => {
    return onSnapshot(doc(db, collectionLabel, documentLabel), (snapshot) => {
      const data = snapshot.data();
      data === undefined ? setDBValue("") : setDBValue(data.text);
    });
  }, [dbValue, setDBValue]);

  const saveToDB = (fieldValue: string) => {
    const maxLength = 100;
    if (fieldValue.length < maxLength){
      const docRef = doc(db, collectionLabel, documentLabel);
      const data = JSON.stringify(fieldValue).substring(1, fieldValue.length+1);
      setDoc(docRef, {
        text: data,
        updatedAt: Date.now()
      });
    }
  }  

  const saveFieldValue = (fieldId: number, fieldValue: string) => saveToDB(fieldValue);

  const saveFieldValueDebounced = AwesomeDebouncePromise(
    saveFieldValue,
    debounceDelay,
    { key: fieldId => fieldId },
  );
  
  const onFieldTextChangeDebounce = async (fieldId: number, fieldValue: string) => await saveFieldValueDebounced(fieldId, fieldValue);

  const onFieldTextChangeDirect = (fieldValue: string) => saveToDB(fieldValue);

  const onDelayInputFieldChange = (fieldValue: string) => {
    const onlyNums = fieldValue.replace(/[^0-9]/g, '');
    parseInt(onlyNums) > 0 ? setDebounceDelay(parseInt(onlyNums)) : setDebounceDelay(0);
  };

  const handleChangedCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => 
    setdelayFieldDisabled(!event.target.checked);

  const onTextFieldChange = (fieldId: number, fieldValue: string) =>
    delayFieldDisabled ? onFieldTextChangeDirect(fieldValue) : onFieldTextChangeDebounce(fieldId, fieldValue);

  return (
    <>
      <p>
      <TextField
        style={{ width: "100%" }}
        id="input-basic"
        onChange={e => onTextFieldChange(1, e.target.value)}
        label="text input field"
        variant="outlined"
      />
      </p>
      <br/>
      <p>
      <TextField
        style={{ width: "100%" }}
        id="display-basic"
        value={dbValue}
        label="read only database value"
        variant="outlined"
        inputProps={
					{ readOnly: true, }
				}
      />
      </p>
      <hr/>
      <p>
      <FormControlLabel
        control={
          <Checkbox onChange={handleChangedCheckbox} />
        }
        label="debounce"
      />
      <TextField
        style={{ width: "50%" }}
        id="debounce-delay"
        value={debounceDelay}
        onChange={e => onDelayInputFieldChange(e.target.value)}
        label="debounce in milliseconds"
        variant="outlined"
        disabled={delayFieldDisabled}
      />
      </p>
    </>
  );
};

export default Elements;
