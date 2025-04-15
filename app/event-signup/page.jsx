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
      <section>
        <ul>
          <li>
            <img src="/CalendarDots.svg" alt="calendar icon" />
            <strong>Datum</strong>: 23 april
          </li>
          <li>
            <img src="/Clock.svg" alt="clock icon" />
            <strong>Tid</strong>: 13:00-15:00
          </li>
          <li>
            <img src="/MapPin.svg" alt="map pin icon" />
            <strong>Plats</strong>: Visual Arena, Lindholmspiren 3
          </li>
        </ul>
      </section>
      <Form
        event
        titles={{ one: "Företagsinformation", two: "Kontakperson" }}
      ></Form>
    </>
  );
}
