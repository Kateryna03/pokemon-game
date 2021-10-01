import { useState } from "react";
import s from "./LoginForm.module.css";
import cn from "classnames";

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setAuth] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(email, password);

    reset();
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <form className={s.root} onSubmit={handleSubmit}>
        <div className={s.root}>
          <input
            className={s.input}
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            id={email}
            required
          />
          <span className={s.highlight}></span>
          <span className={s.bar}></span>
          <label className={s.label}>Email</label>
        </div>
        <div className={s.root}>
          <input
            className={s.input}
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className={s.highlight}></span>
          <span className={s.bar}></span>
          <label className={s.label}>Password</label>
        </div>
        <button
          onClick={() => {
            console.log("Login");
          }}
          type="submit"
        >
          {isAuth ? "Sign In" : "Sign up"}
        </button>
      </form>
    </>
  );
}

export default LoginForm;

// <div>
//   <div class="root">
//     <div>
//       <input type="text" class="input" onChange={handleChange} required />
//       <span class="highlight"></span>
//       <span class="bar"></span>
//       <label class="label">Email</label>
//     </div>
//     <div>
//       <input
//         type="text"
//         name="name"
//         class="input"
//         // value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         //id={name}
//         pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//         title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
//         required
//       />
//       <span class="highlight"></span>
//       <span class="bar"></span>
//       <label class="label">Password</label>
//     </div>
//     <button onClick={handleSubmit} type="submit">
//       Login
//     </button>
//   </div>

// pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
// title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
