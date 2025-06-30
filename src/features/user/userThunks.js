import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../../services/api";

const AUTH_URL = `${API_BASE}/auth`;

export const registerUser = createAsyncThunk("user/register", async (form, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, form);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { error: "Erro ao registrar" });
  }
});

export const loginUser = createAsyncThunk("user/login", async (form, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, form);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { error: "Erro ao fazer login" });
  }
});
