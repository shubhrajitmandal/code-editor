import { useContext } from 'react';
import { ThemeContext } from '@/context';
import styles from './header.module.css';

interface IHeaderProps {
  toggleDiffEditor: () => void;
}

export function Header({ toggleDiffEditor }: IHeaderProps) {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={styles.header}>
      <h1>Code Editor</h1>
      <div className={styles.actions}>
        <div>
          <label>Theme:</label>
          <select
            className={styles.select}
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="purple">Purple</option>
            <option value="grey">Red</option>
          </select>
        </div>
        <button className={styles.button} onClick={toggleDiffEditor}>
          Toggle Diff Editor
        </button>
      </div>
    </div>
  );
}
