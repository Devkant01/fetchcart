// src/components/Startup.jsx
import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/user/userSlice";

export default function Startup() {
    const dispatch = useDispatch();
    const { isLoggedIn, name } = useSelector((state) => state.user);
    const initialized = useRef(false);

    useEffect(() => {
        if (isLoggedIn) return;
        
        if (initialized.current) return;
        initialized.current = true;

        (async () => {
            try {
                const res = await axios.get(`/user/user-info`, { withCredentials: true });

                if (res.data?.email) {
                    dispatch(
                        login({
                            name: res.data.name,
                            email: res.data.email,
                            role: res.data.role,
                            isLoggedIn: true,
                        })
                    );
                } else {
                    dispatch(logout());
                }
            } catch {
                dispatch(logout());
            }
        })();
    }, [dispatch, isLoggedIn]);

    return null;
}
