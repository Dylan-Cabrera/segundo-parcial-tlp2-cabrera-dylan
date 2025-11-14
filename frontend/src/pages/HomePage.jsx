import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const HomePage = () => {
  // TODO: Integrar lógica para obtener superhéroes desde la API
  // TODO: Implementar useState para almacenar la lista de superhéroes
  // TODO: Implementar función para recargar superhéroes
  const [superheroes, setSuperheroes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getHeroes = async() => {
      try {
        setIsLoading(true)
        const response = await fetch("http://localhost:3000/api/superheroes", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json()

        if (response.ok) {
          setSuperheroes(
            data.data
          );
          setIsLoading(false)
          console.log(superheroes.heroes)
        } 
      } catch (error) {
        console.error(error);
      }
    }
  
    useEffect(()=>{
      getHeroes()
    }, [])

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-4xl font-bold text-center mt-8 mb-4 text-gray-800">
        Galería de Superhéroes
      </h1>

      <div className="flex justify-center mb-8">
        <button
        disabled={isLoading}
          onClick={() => {
            // TODO: Implementar función para recargar superhéroes
            getHeroes()
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
        >
          Recargar
        </button>
      </div>
      {isLoading ? (<Loading/>) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {superheroes.map((hero) => (
          <div
            key={hero.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={hero.image}
              alt={hero.superhero}
              className="h-64 object-cover w-full"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {hero.superhero}
              </h3>
            </div>
          </div>
        ))}
      </div>
        </>
      )}
    </div>
  );
};
