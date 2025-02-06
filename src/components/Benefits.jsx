import { useState, useEffect } from 'react';
import { benefitData } from '../constants/index'; // Import your actual JSON here
import HorizontalLine from './HorizontalLine';

const Benefits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitute, setSelectedInstitute] = useState('Institute');
  const [selectedSubject, setSelectedSubject] = useState('Subject');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  const [institutes, setInstitutes] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Handle the search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle the selected institute change
  const handleInstituteChange = (e) => {
    setSelectedInstitute(e.target.value);
  };

  // Handle the selected subject change
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  // Filter the data based on search term and selections
  const filteredData = benefitData.filter((benefit) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (benefit.name.toLowerCase().includes(searchLower) ||
        benefit.institution.toLowerCase().includes(searchLower) ||
        benefit.field.toLowerCase().includes(searchLower) ||
        benefit.country.toLowerCase().includes(searchLower)) &&
      (selectedInstitute === 'Institute' ||
        benefit.institution === selectedInstitute) &&
      (selectedSubject === 'Subject' || benefit.field.includes(selectedSubject))
    );
  });

  // Paginate filtered data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Update the list of available institutes and subjects
  useEffect(() => {
    const availableInstitutes = [
      ...new Set(filteredData.map((item) => item.institution)),
    ];
    const availableSubjects = [
      ...new Set(filteredData.map((item) => item.field)),
    ];

    setInstitutes(['Institute', ...availableInstitutes]);
    setSubjects(['Subject', ...availableSubjects]);
  }, [filteredData]);

  return (
    <div className="container mx-auto p-4">
      <HorizontalLine />
      <br />
      <h2 className="h2 mb-6 text-n-1" style={{ textAlign: 'center' }}>
        Bangladesh Scientists Rankings 2024
      </h2>

      {/* Filtering Options Row */}
      <div className="flex justify-center items-center mb-4 space-x-4">
        <select
          value={selectedInstitute}
          onChange={handleInstituteChange}
          className="p-2 border bg-white border-gray-300 text-black rounded w-1/2 md:w-auto"
        >
          {institutes.map((institute, index) => (
            <option key={index} value={institute}>
              {institute}
            </option>
          ))}
        </select>
        <select
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="p-2 border bg-white border-gray-300 text-black rounded w-1/2 md:w-auto"
        >
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {/* Search Bar Row */}
      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Name, University, Subject, or Interests"
          className="p-2 border border-gray-300 rounded w-full max-w-3xl bg-white text-black"
        />
      </div>

      {/* Displaying Scholar Data */}
      <div className="flex flex-wrap -mx-2">
        {currentItems.map((benefit, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
              <div className="flex h-36 items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <img
                    className="w-16 h-16 rounded-full mr-4"
                    src="https://via.placeholder.com/150" // Replace with the actual image URL if available
                    alt={benefit.name}
                  />
                  <div className="text-left">
                    <a
                      href={benefit.profile}
                      className="text-lg font-semibold text-blue-600 hover:underline"
                    >
                      {benefit.name}
                    </a>
                    <p className="max-w-44 text-sm text-gray-800">
                      {benefit.institution}
                    </p>
                    <p className="text-sm text-gray-800">{benefit.country}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-semibold text-gray-800">
                    H-Index Rankings
                  </p>
                  <p className="text-xs text-gray-600">
                    Institutional: #{benefit.institutional_ranking}
                  </p>
                  <p className="text-xs text-gray-600">
                    Country: #{benefit.country_ranking}
                  </p>
                  <p className="text-xs text-gray-600">
                    Region: #{benefit.regional_ranking}
                  </p>
                  <p className="text-xs text-gray-600">
                    World: #{benefit.world_ranking}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 flex-grow">
                <div className="bg-orange-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800">
                    H-Index
                  </h3>
                  <p className="text-gray-800">Total: {benefit.hIndexTotal}</p>
                  <p className="text-gray-800">
                    Last 6 Years: {benefit.hIndexLast6Years}
                  </p>
                </div>
                <div className="bg-blue-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800">
                    i10 Index
                  </h3>
                  <p className="text-gray-800">
                    Total: {benefit.i10IndexTotal}
                  </p>
                  <p className="text-gray-800">
                    Last 6 Years: {benefit.i10IndexLast6Years}
                  </p>
                </div>
                <div className="bg-purple-200 p-4 rounded-lg col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Citations
                  </h3>
                  <p className="text-gray-800">
                    Total: {benefit.citationsTotal}
                  </p>
                  <p className="text-gray-800">
                    Last 6 Years: {benefit.citationsLast6Years}
                  </p>
                </div>
              </div>
              <div className="p-4 border-t">
                <p className="text-sm text-gray-800">{benefit.field}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 mx-2 border bg-white text-black rounded"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredData.length / itemsPerPage)
          }
          className="p-2 mx-2 border bg-white text-black rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Benefits;
