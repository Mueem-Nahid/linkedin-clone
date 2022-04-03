import { atom } from "recoil";

export const modalState = atom({
    key: 'modalState',
    default: false
}); // similar to const [modal, setModal] = useState(false)

export const modalTypeState = atom({
    key: 'modalTypeState',
    default: 'dropIn'
});