import { prisma } from "./prisma";

async function main(
  tripUpdate: {
    tripId: string;
    newDescription: string;
    newLocation?: string;
    newLatitude: number;
    newLongitude: number;
  }[]
) {
  try {
    for (const update of tripUpdate) {
      const { tripId, newDescription, newLatitude, newLongitude, newLocation } =
        update;
      const trip = await prisma.trip.findUnique({
        where: { id: tripId }
      });
      if (!trip) {
        continue;
      }
      await prisma.trip.update({
        where: {
          id: trip.id
        },
        data: {
          locationDescription: newDescription,
          location: newLocation,
          latitude: newLatitude,
          longitude: newLongitude
        }
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

const tripUpdate = [
  {
    tripId: "0f16f347-0ab1-4313-94e7-dfe169ad959f", // Rancho Sereno
    newDescription:
      "Amsterdã é a capital da Holanda, conhecida por seu patrimônio artístico, um elaborado sistema de canais e casas estreitas com telhados de duas águas, legados da era dourada do século XVII na cidade. O bairro de museus abriga o Museu Van Gogh, o Rijksmuseum, com obras de Rembrandt e Vermeer, e o Stedelijk, que privilegia a arte moderna. O ciclismo é uma característica essencial da cidade, que tem grande quantidade de ciclovias.", // Amsterdam, Holanda
    newLatitude: 52.3738,
    newLongitude: 4.89093
  },
  {
    tripId: "35abfaa7-5bfe-4b82-8edc-001a0b6af7f4", // Mountain Peak Lodge
    newDescription:
      "Montreal é a maior cidade da província de Quebec, no Canadá. Ela fica em uma ilha no rio São Lourenço e foi batizada em homenagem ao Monte Royal, uma montanha com três colinas localizada no centro da cidade. Muitos dos seus bairros já foram cidades independentes, com estilos que variam do francês colonial de Vieux-Montréal, com ruas pavimentadas com pedras arredondadas e a gótica Basílica de Notre-Dame no centro, ao boêmio Plateau..", // Montreal, Canadá
    newLatitude: 45.5167,
    newLongitude: -73.65
  },
  {
    tripId: "40147431-a7dc-40ce-869d-9827c92fd1b3", // Encanto da Serra
    newDescription:
      "Oslo, a capital da Noruega, fica no litoral sul do país, na cabeceira do fiorde de Oslo. A cidade é conhecida por suas áreas verdes e seus museus. Muitos deles ficam na Península Bygdøy, como o Museu Marítimo Norueguês, nas margens da península, e o Museu do Navio Viking, com exemplares do século IX. A Holmenkollbakken é uma colina para a prática de saltos de esqui com vista panorâmica do fiorde e um museu de esqui.", // Oslo, Noruega
    newLatitude: 59.9138,
    newLongitude: 10.7387
  },
  {
    tripId: "5a5637eb-e0e5-4810-8b80-b208dab162dc", // Azure Haven Retreat
    newLocation: "Morcote, Suíça",
    newDescription:
      "Morcote é uma comuna da Suíça, no Cantão Tessino, com cerca de 710 habitantes. Estende-se por uma área de 2,8 km², de densidade populacional de 254 hab/km². Confina com as seguintes comunas: Barbengo, Brusimpiano, Brusino Arsizio, Carona, Porto Ceresio, Vico Morcote. A língua oficial nesta comuna é o Italiano.", // Morcote, Suíça
    newLatitude: 45.9365,
    newLongitude: 8.91021
  },
  {
    tripId: "680fb778-106e-4a49-8217-217fa2faad4e", // Royal Oasis
    newDescription:
      'Florença, capital da região Toscana, na Itália, abriga muitas obras de arte e arquitetura renascentistas. Um dos seus pontos turísticos mais emblemáticos é o Duomo, catedral com cúpula de telhas de terracota, projetada por Brunelleschi, e o campanário de Giotto. A Galleria dell\'Accademia exibe a escultura "Davi", de Michelangelo. A Galeria Uffizi exibe "O Nascimento de Vênus", de Botticelli, e "A Anunciação" de Da Vinci.', // Florença, Itália
    newLatitude: 43.7687,
    newLongitude: 11.2569
  },
  {
    tripId: "761ce228-a337-4f1f-aad5-806855fbcdcf", // Palazzo Sereno
    newDescription:
      "Madrid, a capital da Espanha, situada no centro do país, é uma cidade de avenidas elegantes e parques grandes e bem cuidados, como o Buen Retiro. Ela é famosa pelos ricos acervos de arte europeia, entre os quais estão as obras de Goya, Velázquez e outros mestres espanhóis no Museu do Prado. O centro da antiga Madri da época da Casa de Habsburgo é a Plaza Mayor, ladeada por pórticos, e nas proximidades ficam o barroco Palácio Real e o Arsenal Real, que exibe armas históricas.", // Madrid, Espanha
    newLatitude: 40.4167,
    newLongitude: -3.70325
  },
  {
    tripId: "83aa5db7-1c0b-4917-af36-1b318f892db0", // Chalé Serenidade
    newDescription:
      "Paris, a capital da França, é uma importante cidade europeia e um centro mundial de arte, moda, gastronomia e cultura. Sua paisagem urbana do século XIX é cortada por avenidas largas e pelo rio Sena. A cidade é conhecida por monumentos como a Torre Eiffel e a Catedral de Notre-Dame, uma construção gótica do século XII, sendo famosa também pela cultura dos cafés e por lojas de estilistas famosos na Rue du Faubourg Saint-Honoré.", // Paris, França
    newLatitude: 48.8032,
    newLongitude: 2.3511
  },
  {
    tripId: "b0ab4e5f-ae5e-4dbe-abf0-3a47dc8cd2d2", // Hotel Palace
    newDescription:
      "A cidade de Nova York compreende 5 distritos situados no encontro do rio Hudson com o Oceano Atlântico. No centro da cidade fica Manhattan, um distrito com alta densidade demográfica que está entre os principais centros comerciais, financeiros e culturais do mundo. Entre seus pontos emblemáticos, destacam-se arranha-céus, como o Empire State Building, e o enorme Central Park. O teatro da Broadway fica em meio às luzes de neon da Times Square.", // New York, Estados Unidos
    newLatitude: 40.6643,
    newLongitude: -73.9385
  },
  {
    tripId: "fae33544-5d91-4289-a93a-b776df83cff9", // Hotel Aurora
    newDescription:
      "Amalfi é uma cidade num deslumbrante cenário natural sob penhascos íngremes na costa sudoeste de Itália. Entre os séculos IX e XI, era a localização de uma poderosa república marítima. A catedral árabe-normanda de Sant'Andrea, no centro da cidade e com uma fachada bizantina listada, sobrevive desde essa era. O Museo Arsenale Amalfi é um antigo estaleiro medieval transformado em espaço para exposições.", // Amalfi, Itália
    newLatitude: 40.6344,
    newLongitude: 14.6026
  }
];

main(tripUpdate);
