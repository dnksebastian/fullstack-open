const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
  <p>
    <b>Number of exercises {sum}</b>
  </p>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Course = (props) => {
  const total = props.course.parts.reduce((sum, { exercises }) => {
    return (sum += exercises);
  }, 0);

  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total sum={total} />
    </>
  );
};

export default Course;
