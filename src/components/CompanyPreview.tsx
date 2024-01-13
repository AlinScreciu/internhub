import { type Company } from "@prisma/client";
import Link from "next/link";

const CompanyPreview: React.FC<{ company: Company }> = ({ company }) => {
  return (
    <div>
      <div className="py-1 text-3xl font-bold">{company.name}</div>
      <div className="py-1 text-2xl font-bold">Overview</div>
      <div>{company.description}</div>
      <div>
        <div className="font-bold ">Website</div>
        <Link className="text-blue-700" href={company.website} target="_blank">
          {company.website}
        </Link>
      </div>
      <div>
        <div className="font-bold">Domain</div>
        <div>{company.domain}</div>
      </div>
      <div>
        <div className="font-bold">Company size</div>
        <div>{company.employees} employees</div>
      </div>
      <div>
        <div className="font-bold">Headquarters</div>
        <div>{company.headquarters}</div>
      </div>
    </div>
  );
};

export default CompanyPreview;
