import styles from "./layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout(props: LayoutProps) {
  return <div className={styles.container}>{props.children}</div>;
}

export default Layout;
