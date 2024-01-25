import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from './components/AuthForm';
import { Layout } from "antd";
import Home from "./components/Home";
import AppBar from "./components/AppBar";
import styles from "./styles";

const { Footer } = Layout;

const App = () => {
    return (
        <BrowserRouter>
            <Layout style={styles.layout}>
                <AppBar />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/authform" element={<AuthForm />}/>
                </Routes>
                <Home />
                <Footer>2024 Instaverse</Footer>
            </Layout>
        </BrowserRouter>
    )
}

export default App;
