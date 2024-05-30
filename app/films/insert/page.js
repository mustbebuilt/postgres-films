import { insertFilm } from '@/app/lib/db';
import styles from "@/app/page.module.css";

export default async function Page() {


    return (
        <div>
            <form action={insertFilm}>
                <div>
                    <label htmlFor="filmTitle">Title:</label>
                    <input type="text" id="filmTitle" name="filmTitle" required />
                </div>
                <div>
                    <label htmlFor="filmCertificate">Certificate:</label>
                    <input type="text" id="filmCertificate" name="filmCertificate" required />
                </div>
                <div>
                    <label htmlFor="filmDescription">Description:</label>
                    <textarea id="filmDescription" name="filmDescription" required />
                </div>
                <div>
                    <label htmlFor="filmImage">Image:</label>
                    <input type="text" id="filmImage" name="filmImage" required />
                </div>
                <div>
                    <label htmlFor="filmPrice">Price:</label>
                    <input type="number" id="filmPrice" name="filmPrice" required />
                </div>
                <div>
                    <label htmlFor="stars">Stars:</label>
                    <input type="number" id="stars" name="stars" required />
                </div>
                <div>
                    <label htmlFor="releaseDate">Release Date:</label>
                    <input type="date" id="releaseDate" name="releaseDate" required />
                </div>
                <button type="submit">Add Film</button>
            </form>
        </div>
    )
}