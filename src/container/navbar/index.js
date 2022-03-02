import React, { useState } from "react";
import "./navbar.css";
import Modal from "../model/index";
import { useDispatch, useSelector } from "react-redux";
import { GlobalActions } from "../../redux/actions";
function Index() {
  const [openModel, setOpenModel] = useState(false);
  const [state, setState] = useState({
    name: "",
    company: "",
    status: "active",
    notes: "",
  });
  const dispatch = useDispatch();
  const globalData = useSelector((state) => state.globalData);

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <div className="topbar">
        <div>
          <h3>Redux Table</h3>
        </div>
        <button className="button-container" onClick={() => setOpenModel(true)}>
          Add Members
        </button>
      </div>
      <hr />
      <Modal
        title="Add Member"
        onClose={() => setOpenModel(false)}
        show={openModel}
        onSubmit={() => {
          let updatedData = {
            checked: false,
            name: state.name,
            company: state.company,
            status: state.status,
            lastUpdated: new Date().toLocaleDateString(),
            Notes: state.notes,
            delete: false,
          };

          dispatch(GlobalActions.setGlobalData([...globalData, updatedData]));
          setOpenModel(false);
        }}
      >
        <form>
          <div style={{ padding: "10px" }}>
            <div className="label"> Name</div>

            <input
              type="text"
              name="name"
              className="inputField"
              value={state.name}
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <div className="label"> Company</div>

            <input
              type="text"
              name="company"
              className="inputField"
              value={state.company}
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <div className="label"> Status</div>

            <select
              className="inputField"
              onChange={(event) => {
                setState((prevState) => ({
                  ...prevState,
                  status: event.target.value,
                }));
              }}
            >
              <option value={"active"}>Active</option>
              <option value={"inactive"}>Inactive</option>
            </select>
          </div>
          <div style={{ padding: "10px" }}>
            <div className="label"> Notes</div>

            <input
              type="text"
              name="notes"
              className="inputField"
              value={state.notes}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Index;
