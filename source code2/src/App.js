import React, { useState } from "react";
import "./App.css";

// IMPORTING LIST
import { List } from "./components/List";

// importing material ui add-button
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

// IMPORTING REDUX
import { connect } from "react-redux";
import { add, deleteTodo, updateTodo } from "./redux/actions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

function App({ add, allList, deleteTodo, updateTodo }) {
  // STATES START
  let [item, setItem] = useState("");
  const [value, setValue] = useState(0);
  // STATES END

  const classes = useStyles();

  // HANDLE CHANGE START
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeInput = (event) => {
    setItem(event.target.value);
  };
  // HANDLE CHANGE END

  //   UPDATE LIST START
  const updateList = (event) => {
    event.preventDefault();
    const newAdd = {
      id: Math.floor(Math.random() * 1000000000),
      tar: false,
      val: item,
    };
    add(newAdd);
    setItem("");
  };

  const deleteItem = (id) => {
    deleteTodo(id);
  };

  const checkedCompleted = (e, val, id) => {
    const updatedTar = e.target.checked;
    updateTodo({ id, tar: updatedTar, val });
  };

  const completedTask = allList.filter((prev) => prev.tar === true);
  const incompletedTask = allList.filter((prev) => prev.tar === false);

  return (
    <div className="fullPage">
      <div className="box">
        <form onSubmit={updateList}>
          <h1>ToDo List</h1>
          <div className="inputfield">
            <input
              required
              type="text"
              placeholder="Add an Item"
              value={item}
              onChange={changeInput}
            />
            <button className="addbutton">
              <AddIcon className="icon" />
            </button>
          </div>
          <br />
          <br />
          <div className="tabs_nav">
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="All" {...a11yProps(0)} />
                  <Tab label="Complete" {...a11yProps(1)} />
                  <Tab label="Incomplete" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <div className="ListContainer">
                  <ul>
                    {allList.map((listExtend, index) => {
                      return (
                        <List
                          key={index}
                          list={listExtend.val}
                          id={listExtend.id}
                          onSelect={deleteItem}
                          tar={listExtend.tar}
                          checkedCompleted={checkedCompleted}
                        />
                      );
                    })}
                  </ul>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="ListContainer">
                  <ul>
                    {completedTask.map((listExtend, index) => {
                      return (
                        <List
                          key={index}
                          list={listExtend.val}
                          id={listExtend.id}
                          onSelect={deleteItem}
                          tar={listExtend.tar}
                          checkedCompleted={checkedCompleted}
                        />
                      );
                    })}
                  </ul>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="ListContainer">
                  <ul>
                    {incompletedTask.map((listExtend, index) => {
                      return (
                        <List
                          key={index}
                          list={listExtend.val}
                          id={listExtend.id}
                          onSelect={deleteItem}
                          tar={listExtend.tar}
                          checkedCompleted={checkedCompleted}
                        />
                      );
                    })}
                  </ul>
                </div>
              </TabPanel>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    allList: state.Reducer.allList,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    add: function (data) {
      dispatch(add(data));
    },
    deleteTodo: function (id) {
      dispatch(deleteTodo(id));
    },
    updateTodo: function (data) {
      dispatch(updateTodo(data));
    },
  };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(App);
