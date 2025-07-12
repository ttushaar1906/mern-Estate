import { useEffect, useState } from 'react';
import { City, ICity } from 'country-state-city';
import { FaLocationDot, FaPlus } from 'react-icons/fa6';
import { MdOutlineClose } from 'react-icons/md';

export default function CityPreference() {
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCities, setSelectedCities] = useState<ICity[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchedCities = City.getCitiesOfCountry('IN');
    setCities(fetchedCities);
  }, []);

  const getCityId = (city: ICity) =>
    `${city.name}-${city.stateCode}-${city.countryCode}`;

  const availableCities = cities.filter((city) => {
    const cityId = getCityId(city);
    const isSelected = selectedCities.some(
      (selected) => getCityId(selected) === cityId
    );
    const matchesSearch = city.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return !isSelected && matchesSearch;
  });

  const addCity = (city: ICity) => {
    if (selectedCities.length < 3) {
      setSelectedCities((prev) => [...prev, city]);
      setIsDropdownOpen(false);
      setSearchTerm('');
    }
  };

  const removeCity = (cityId: string) => {
    setSelectedCities((prev) =>
      prev.filter((city) => getCityId(city) !== cityId)
    );
  };

  const canAddMore = selectedCities.length < 3;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg relative z-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaLocationDot className="text-blue-500" />
        Select Cities
      </h2>

      {/* Selected Cities */}
      <div className="mb-6 space-y-2">
        {selectedCities.map((city) => (
          <div
            key={getCityId(city)}
            className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-2"
          >
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{city.name}</span>
              <span className="text-sm text-gray-500">{city.countryName}</span>
            </div>
            <button
              onClick={() => removeCity(getCityId(city))}
              className="p-1 hover:bg-red-100 rounded-full transition-colors"
              title="Remove city"
            >
              <MdOutlineClose className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Add City Button */}
      {canAddMore && (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            Add City ({selectedCities.length}/3)
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search city..."
                className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
              />
              {availableCities.length > 0 ? (
                availableCities.map((city) => (
                  <button
                    key={getCityId(city)}
                    onClick={() => addCity(city)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {city.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {city.stateCode}, {city.countryName}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-center">
                  No matching cities
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Max limit message */}
      {!canAddMore && (
        <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
          <p className="text-sm">Maximum of 3 cities selected</p>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
