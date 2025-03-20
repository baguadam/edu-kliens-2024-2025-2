import cover from "../../assets/cover-without-text.png"
export function Home() {
  return (
<div className="hero min-h-[80vh] bg-base-100">
  <img src={cover} alt="" className="h-[80vh] contrast-50 drop-shadow	brightness-50 opacity-35	"/>
  <div className="hero-content flex-col lg:flex-row-reverse w-10/12">
    <div className="text-center ml-10 lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Come and create playlists with ease, tailor your music experience to your heart's content! Add your favorite tracks to your perfect playlists and let the music take you on a journey!</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-300">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}
