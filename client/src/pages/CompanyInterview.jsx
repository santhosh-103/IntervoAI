import {
  FaBuilding,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CompanyInterview() {
  const navigate = useNavigate();

  const companies = [
    {
      name: "TCS",
      description:
        "TCS NQT, Technical, HR & Managerial Round",
    },
    {
      name: "Infosys",
      description:
        "Infosys Technical + HR Interview Preparation",
    },
    {
      name: "Capgemini",
      description:
        "Aptitude, Coding, Technical & HR Rounds",
    },
    {
      name: "Cognizant",
      description:
        "CTS GenC Technical & Communication Assessment",
    },
    {
      name: "Wipro",
      description:
        "Elite NTH Mock Interview Experience",
    },
    {
      name: "Zoho",
      description:
        "Problem Solving & Product Based Interview",
    },
    {
      name: "Amazon",
      description:
        "Leadership Principles + DSA Preparation",
    },
    {
      name: "Accenture",
      description:
        "Coding, Communication & Technical Assessment",
    },
  ];

  const startInterview = (company) => {
    localStorage.setItem(
      "selectedCompany",
      company
    );

    localStorage.setItem(
      "interviewConfig",
      JSON.stringify({
        role: `${company} Interview`,
        difficulty: "Mixed",
        questions: 10,
      })
    );

    toast.success(
      `${company} Interview Started 🚀`
    );

    navigate("/interview");
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center">

          <h1 className="text-5xl font-bold text-white">
            Company Specific Interviews
          </h1>

          <p className="text-slate-400 mt-4">
            Practice interviews tailored
            for your dream company
          </p>

        </div>

        {/* Company Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

          {companies.map((company) => (
            <div
              key={company.name}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500 transition duration-300"
            >

              <FaBuilding className="text-4xl text-indigo-500 mb-5" />

              <h2 className="text-2xl font-bold text-white">
                {company.name}
              </h2>

              <p className="text-slate-400 mt-4 min-h-[80px]">
                {company.description}
              </p>

              <button
                onClick={() =>
                  startInterview(
                    company.name
                  )
                }
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                Start Interview
                <FaArrowRight />
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default CompanyInterview;