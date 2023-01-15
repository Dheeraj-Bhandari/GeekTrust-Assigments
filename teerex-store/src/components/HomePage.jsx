import React from "react";

const HomePage = () => {
  return (
    <>
      <ul className="list-group list-group-light list-group-small">
        <li className="list-group-item text-bg-danger">Features Implemented</li>
        <li className="list-group-item text-bg-dark">Did not use any Dependency for Desiginig or Implementing any Core Feautre</li>
        <li className="list-group-item text-bg-dark">Writing Function and Code in With Comments and Proper Error handling to Increase Readability</li>
        <li className="list-group-item text-bg-dark">Used Redcuder to manage the State for Clean Code </li>
        <li className="list-group-item text-bg-dark">Created Diifrent Context and Reducer (Cart, Filter, Prouct) to Increase Extensibility of Code</li>

      </ul>
      <img
      style={{"width":"100%" , "height":"100vh"}}
      src="https://media.istockphoto.com/id/1255047767/photo/colorful-polo-t-shirt-stack-on-shelf-in-large-department-store-shop-copy-space-on-white-sign.jpg?s=612x612&w=0&k=20&c=pa5wNfsM8B0Q5ElJhjKDkR-SLfypcMXVM2xlWE2d1yg=" alt="" />
    </>
  );
};

export default HomePage;
