import { Form } from "../components/forms/Form";
import { Hero } from "../components/common/Hero";

export default function Home() {
  return (
    <>
      <Hero
        backgroundImage="/event-image.svg"
        title="YrgoLink"
        text="lia-event"
        text2="2025"
      ></Hero>
      <Form
        event
        titles={{ one: "Företagsinformation", two: "Kontakperson" }}
      ></Form>
    </>
  );
}
