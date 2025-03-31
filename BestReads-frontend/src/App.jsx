import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // For transitions

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
  const location = useLocation(); // To track the current location for transitions

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={500} // Adjust the duration of the transition
            classNames="page-transition"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/books/:categoryName" element={<BooksList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin/books" element={<AdminRoute><ManageBooks /></AdminRoute>} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/author/:authorId" element={<AuthorProfile />} />
              
              {/* PrivateRoute for Home */}
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Suspense>
    </Router>
  );
};

export default App;
