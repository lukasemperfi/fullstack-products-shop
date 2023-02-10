import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section
      style={{
        color: "black",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "32px",
        fontWeight: "500",
      }}
    >
      <div>Unauthorized</div>
      <p>You do not have access to the requested page.</p>
      <div>
        <button
          style={{
            color: "black",
            backgroundColor: "GrayText",
            display: "flex",
            padding: "10px",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "500",
          }}
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </section>
  );
};
