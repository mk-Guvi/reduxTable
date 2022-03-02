import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalActions } from "../../redux/actions";
import "./style.css";
function ReduxTable() {
  let [data, setData] = useState([
    {
      checked: false,
      name: "mdadsad",
      company: "same",
      status: "active",
      lastUpdated: "2020-01-01",
      Notes: "some description",
      delete: false,
    },
    {
      checked: false,
      name: "madsasdda",
      company: "samse",
      status: "inactive",
      lastUpdated: "2020-01-01",
      Notes: "some description",
      delete: false,
    },
    {
      checked: false,
      name: "mda",
      company: "saame",
      status: "active",
      lastUpdated: "2020-01-01",
      Notes: "some description",
      delete: false,
    },
  ]);
  let [openFilter, setOpenFilter] = useState(false);
  const globalData = useSelector((state) => state.globalData);
  const dispatch = useDispatch();

  const handleCheckAll = () => {
    if (globalData.every((eachRow) => eachRow.checked)) {
      const updatedData = globalData.map((each) => {
        each.checked = false;
        return each;
      });
      dispatch(GlobalActions.setGlobalData(updatedData));
    } else {
      const updatedData = globalData.map((each) => {
        each.checked = true;
        return each;
      });
      dispatch(GlobalActions.setGlobalData(updatedData));
    }
  };
  const sortByStatus = (status) => {
    dispatch(
      GlobalActions.setGlobalData(
        globalData.sort((a, b) => (a.status === status ? -1 : 1))
      )
    );
  };
  const handleDelete = (eachRowIndex) => {
    dispatch(
      GlobalActions.setGlobalData(
        globalData.filter((each, i) => i !== eachRowIndex)
      )
    );
  };
  const handleFilter = (index) => {
    const updatedData = globalData.map((each, i) => {
      if (i === index) {
        each.checked = !each.checked;
      }
      return each;
    });

    dispatch(GlobalActions.setGlobalData(updatedData));
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      {globalData.length ? (
        <>
          <div className="filter">
            <div>
              <form>
                <div className="multiselect">
                  <div
                    className="selectBox"
                    onClick={() => setOpenFilter(!openFilter)}
                  >
                    <select>
                      <option>
                        Company(
                        {
                          globalData.filter((each) => each.checked === true)
                            .length
                        }
                        )
                      </option>
                    </select>
                    <div className="overSelect"></div>
                  </div>
                  <div
                    id="checkboxes"
                    style={{ display: openFilter ? "block" : "none" }}
                  >
                    <label htmlFor="selectAll">
                      <input
                        type="checkbox"
                        id="selectAll"
                        checked={globalData.every((eachRow) => eachRow.checked)}
                        onChange={handleCheckAll}
                      />
                      select All
                    </label>

                    {globalData.map((eachRow, i) => (
                      <div
                        onClick={() => handleFilter(i)}
                        key={eachRow.name + i}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={eachRow.checked}
                          id={eachRow.company}
                          onChange={() => handleFilter(i)}
                        />
                        {eachRow.company}
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
            <div>
              <select
                onChange={(e) => {
                  sortByStatus(e.target.value);
                }}
              >
                <option value="status">status</option>
                <option
                  value="inactive"
                  onClick={() => sortByStatus("inactive")}
                >
                  inactive
                </option>
                <option value="active" onClick={() => sortByStatus("active")}>
                  active
                </option>
              </select>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                {Object.keys(globalData[0]).map((eachCol, i) => {
                  return (
                    <th key={i}>
                      {eachCol === "checked" && (
                        <input
                          type={"checkbox"}
                          checked={globalData.every(
                            (eachRow) => eachRow.checked
                          )}
                          onChange={handleCheckAll}
                        />
                      )}
                      {eachCol === "delete" || eachCol === "checked"
                        ? ""
                        : eachCol}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {globalData.map((eachRow, eachRowIndex) => {
                return (
                  <tr key={eachRow.name}>
                    {Object.keys(eachRow).map((eachCol, i) => {
                      return (
                        <td key={eachCol}>
                          {eachCol === "checked" && (
                            <input
                              type={"checkbox"}
                              checked={eachRow.checked}
                              onChange={() => {
                                const updatedData = globalData.map((each) => {
                                  if (each.name === eachRow.name) {
                                    each.checked = !each.checked;
                                  }
                                  return each;
                                });
                                dispatch(
                                  GlobalActions.setGlobalData(updatedData)
                                );
                              }}
                            />
                          )}
                          {eachCol === "delete" ? (
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(eachRowIndex)}
                            >
                              Delete
                            </button>
                          ) : (
                            eachRow[eachCol]
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <h1>No Data Found</h1>
      )}
    </div>
  );
}

export default ReduxTable;
