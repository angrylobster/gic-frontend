import axios from 'axios';
import { EMPLOYEE_BACKEND_HOSTNAME } from './constants';

export const httpClient = axios.create({
  baseURL: EMPLOYEE_BACKEND_HOSTNAME
});
