import { useState, useCallback, useEffect } from 'react'
import styles from "./PasswordGenerator.module.css"

const PasswordGenerator = () => {
    const [length, setLength] = useState(8);
    const [allowNums, setAllowNums] = useState(true);
    const [allowSpecialChars, setAllowSpecialChars] = useState(false);
    const [password, setPassword] = useState("");

    const [savedPasswords, setSavedPasswords] = useState([]);

    function savePassword() {
        if (password && !savedPasswords.includes(password)) {
            setSavedPasswords((prevSavedPasswords) => {
                const newSavedPasswords = [...prevSavedPasswords, password];
                localStorage.setItem('memPass', JSON.stringify(newSavedPasswords));
                return newSavedPasswords;
            });
        }
    }
    useEffect(() => {
        const storedPasswords = localStorage.getItem('memPass');
        if (storedPasswords) {
            setSavedPasswords(JSON.parse(storedPasswords));
        }
    }, []);


    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (allowNums) str += "0123456789"
        if (allowSpecialChars) str += ` ~!@#$%^&*()_+\-=[]{};'|:"<>?,./\\\``;

        for (let i = 1; i <= length; ++i) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, allowNums, allowSpecialChars, setPassword]);

    useEffect(() => {
        passwordGenerator()
    }, [allowNums, allowSpecialChars, passwordGenerator])

    console.log("🗣🔥🔥🔥sussy baka spotted")
    return (
        <div className={styles.page}  >
            <div className={styles.hWrapper}>
                <span className={`${styles.heading} monosans`}>K3Y5</span>
                <a href="https://github.com/khushalrathore/k3y5.git" target="_blank" rel="noopener noreferrer">🔗</a>
            </div>

            <textarea className={styles.password} type='text' value={password} readOnly id="password" placeholder="Generated Password" fontSize={"1rem"} variant="subtle" />

            <div className={styles.lengthWrapper}>
                <input type="range" id="length" defaultValue={8} min={"8"} max={"256"} onChange={(e) => setLength(e.target.value)} />
                <label htmlFor="length" className='monosans'>Length: {length}</label>
            </div>

            <div className="flex">
                <div className={styles.numsWrapper}>
                    <input type="checkbox" id="nums" defaultChecked={allowNums} onChange={() => setAllowNums(prev => (!prev))} />
                    <label htmlFor="nums" className='monosans'>Nums: {allowNums ? "0-9" : "NA"}</label>
                </div>

                <div className={styles.charsWrapper}>
                    <input type="checkbox" id="chars" defaultChecked={allowSpecialChars} onChange={() => setAllowSpecialChars(prev => (!prev))} />
                    <label htmlFor="chars" className='monosans'>Chars: {allowSpecialChars ? `~!@#$%^&*()_+\-=[]{};'|:"<>?,./\\\`` : "NA"}</label>
                </div>
            </div>
            <div className={styles.usage}>
                <button onClick={savePassword} className={`${styles.savePassword} monosans`}>Save Password</button>
                <button className={`${styles.copyPassword} monosans`}>Copy Password</button>
            </div>
            <div className={`${styles.savedPasswords} monosans`}>
                {
                    savedPasswords.map((item, index) =>
                        <li key={index}>
                            {item}
                            <div >
                                x{item.length}
                            </div>
                        </li>
                    )
                }
            </div>
        </div>
    )
}

export default PasswordGenerator