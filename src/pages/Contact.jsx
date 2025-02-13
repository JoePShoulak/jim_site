import useTitle from "../hooks/useTitle";

const Contact = () => {
  useTitle("Contact");

  return (
    <main>
      <aside></aside>
      <main>
        <div>
          <h1>About</h1>
          <p>
            Jim Shoulak was born and raised in Wisconsin. He’s been married to
            Judy for 40 years, and they have 3 children. They currently live in
            Minnesota. Jim was ordained a deacon in the Episcopal Church on July
            29th, 2010. He served two parishes and now is privileged to serve as
            chaplain for his local police department.
            <br />
            <br />
            <em>
              “For many years I dreamed of assembling a prayer routine based on
              the Ordination Vows of a Deacon — of course with a focused theme
              of service. With the computer help of my son Joe P. Shoulak, this
              is the result! I pray that this site will ‘be a service’ to you!”
            </em>
            <br />
            <br />
            Peace and blessings, Jim
          </p>
        </div>
      </main>
      <aside></aside>
    </main>
  );
};

export default Contact;
