import React, { Suspense, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group"; // Use CSSTransition
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary

// Lazy load components
const Home = React.lazy(() => import("./pages/Home"));
const BooksList = React.lazy(() => import("./pages/BooksList"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const ManageBooks = React.lazy(() => import("./pages/ManageBooks"));
const BookDetails = React.lazy(() => import("./pages/BookDetails"));
const Categories = React.lazy(() => import("./pages/Categories"));
const AuthorProfile = React.lazy(() => import("./pages/AuthorProfile"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const PrivateRoute = React.lazy(() => import("./components/PrivateRoute"));
const AdminRoute = React.lazy(() => import("./components/AdminRoute"));

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <AnimatedRoutes />
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null); // Add a ref for the transitioning node

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={500}
        classNames="page-transition"
        nodeRef={nodeRef} // Use nodeRef to avoid findDOMNode
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<Home />} /> {/* Ensure this is the default route */}
            <Route path="/books/:categoryName" element={<BooksList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/books" element={<AdminRoute><ManageBooks /></AdminRoute>} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/author/:authorId" element={<AuthorProfile />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} /> {/* Ensure PrivateRoute points to Home */}
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
