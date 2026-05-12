export const PatientCard = ({ name, age, condition }: any) => (
  <div className="p-4 bg-white border rounded-lg shadow-sm mb-4">
    <h2 className="text-xl font-bold">{name}</h2>
    <p className="text-gray-600">{age} years • {condition}</p>
  </div>
);