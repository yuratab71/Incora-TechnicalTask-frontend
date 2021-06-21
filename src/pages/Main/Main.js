import React, { useEffect } from "react";
import Header from "../../common/components/Header/Header";
import CreateForm from "../../common/components/CreateForm/CreateForm";
import {
  setData,
  setCreate,
  setDelete,
  setPatch,
} from "../../redux/reducers/mainReducer";
import ItemCard from "../../common/components/ItemCard/ItemCard";
import Progress from "../../common/components/CircularProgress/CircularProgress";
import { connect } from "react-redux";
import "./main.css";

const Main = ({
  data,
  token,
  setData,
  setCreate,
  setDelete,
  currentUserId,
  setPatch,
  logout,
  isFetching,
}) => {
  useEffect(() => {
    setData(token, logout);
  }, []);
  return (
    <div className="main_container">
      <Header />
      <CreateForm create={setCreate} token={token} />
      {isFetching ? (
        <Progress />
      ) : (
        data.map((el) => {
          return (
            <ItemCard
              key={el._id}
              name={el.name}
              email={el.authorEmail}
              description={el.description}
              date={el.date}
              imageUrl={el.imageUrl}
              isModified={el.modifide}
              authorId={el.authorId}
              currentUserId={currentUserId}
              id={el._id}
              deleteItem={setDelete}
              token={token}
              setPatch={setPatch}
              logout={logout}
            />
          );
        })
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.main.data,
    token: state.auth.token,
    currentUserId: state.auth.userId,
    logout: state.auth.logout,
    isFetching: state.main.isFetching,
  };
};

export default connect(mapStateToProps, {
  setData,
  setCreate,
  setDelete,
  setPatch,
})(Main);
