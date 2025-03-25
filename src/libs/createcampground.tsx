import { createCampgroundItem } from "../../interface";

export default async function createCampground(item: createCampgroundItem, token: string) {
  const response = await fetch(`https://campground-backend-cyan.vercel.app/api/v1/campgrounds/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({
        name: item.name,
        address: item.address,
        district: item.district,
        province: item.province,
        postalcode: item.postalcode,
        tel: item.tel,
        picture: item.picture,
        dailyrate: item.dailyrate,
    })
  });

  if (!response.ok) {
    const errorDetails = await response.text();  // Capture response text for error details
    alert("Overbooked You've reached your limit.")
    throw new Error(`Failed to Create: ${errorDetails}`);
  }

  return await response.json();
}
