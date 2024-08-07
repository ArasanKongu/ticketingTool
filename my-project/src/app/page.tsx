import PageLayout from "./components/navbar&Footerlayout/layout";
import HomePage from "./dashboard/page";
import Login from "./login/page";

export default function Home() {
  return (
    <PageLayout>
      <HomePage />
    </PageLayout>
  );
}
