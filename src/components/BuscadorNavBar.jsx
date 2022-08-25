import React from 'react'
import { useEffect, useState } from "react";

export default function BuscadorNavBar() {

const [search, setSearch] = useState("");

return (
  <div className="bg-white">
    <form>
      <label>
        <input type="text" name="name" placeholder="Movie, series, etc" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  </div>
  )
}