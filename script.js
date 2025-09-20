const btnprojects = document.getElementById('BTNPro');
const btnskill = document.getElementById('BTNSkill');
const btnserti = document.getElementById('BtnCerti');

const sectionProjects = document.getElementById('sectionProjects');
const sectionSkill = document.getElementById('sectionSkill');
const sectionCertificate = document.getElementById('sectionCertificate');
const sections = [sectionProjects, sectionSkill, sectionCertificate];
const buttons = [btnprojects, btnskill, btnserti]; // simpan semua tombol

document.getElementById('button10').addEventListener("click",() =>{
    const section= document.getElementById('about1');
    section.scrollIntoView({behavior:"smooth"});
}
);
function show(section, mode, button) {
  // sembunyikan semua section
  sections.forEach(s => s.style.display = 'none');
  // tampilkan section yang dipilih
  section.style.display = mode;

  // reset semua tombol
  buttons.forEach(b => b.classList.remove("active-btn"));
  // aktifkan tombol yang diklik
  button.classList.add("active-btn");
}

// default: Projects
show(sectionProjects, 'flex', btnprojects);

// event listener
btnprojects.onclick = () => show(sectionProjects, 'flex', btnprojects);
btnskill.onclick = () => show(sectionSkill, 'flex', btnskill);
btnserti.onclick = () => show(sectionCertificate, 'block', btnserti);


// Ganti dengan project Supabase kamu
const SUPABASE_URL = "https://yntwjgvoqccksjaqtczy.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludHdqZ3ZvcWNja3NqYXF0Y3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NzY3MzAsImV4cCI6MjA3MzI1MjczMH0.0Q7QjKZGjTKxfNrK9RhAUk7PPfkyauAo-A1Tja5vKl0";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);// ambil semua komentar saat load
async function loadComments() {
  const { data, error } = await supabaseClient
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Load error:", error);
    return;
  }

  const commentList = document.getElementById("commentList");
  commentList.innerHTML = "";
  data.forEach(c => {
    addCommentToPage(c.name, c.message);
  });
    document.getElementById("commentCount").textContent = data.length;
}

// submit form
document.getElementById("commentfrom").addEventListener("submit", async function(e) {
  e.preventDefault();
  console.log("Form submitted"); // debug

  const name = document.getElementById("Name2").value;
  const message = document.getElementById("Message1").value;
  console.log("Input:", name, message); 

if (!name.trim() || !message.trim()) {
  console.log("Nama dan pesan tidak boleh kosong");
  return;
}
  const { data, error } = await supabaseClient
    .from("comments")
    .insert([{ name, message }])
    .select();

  if (error) {
    console.error("Insert error:", error);
    return;
  }

  console.log("Insert success:", data); // debug
  addCommentToPage(data[0].name, data[0].message);
  const countSpan = document.getElementById("commentCount");
  countSpan.textContent = parseInt(countSpan.textContent) + 1;
  this.reset();
});

function addCommentToPage(name, message) {
  const commentList = document.getElementById("commentList");
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("komen-baru");
  commentDiv.innerHTML = `<strong>${name}</strong>: ${message}`;
  commentList.prepend(commentDiv);
}

// load awal
loadComments();
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(
    ".fade-up, .fade-left, .fade-right, .zoom-in"
  );

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target); // biar sekali animasi aja
        }
      });
    },
    { threshold: 0.3 } // aktif kalau 20% section terlihat
  );

  sections.forEach((sec) => observer.observe(sec));
});

const mscbtn= document.getElementById('music-btn');
const msc= document.getElementById('bg-music');

let isplaying= false;

mscbtn.addEventListener('click',() =>{
    if(isplaying){
      msc.pause();
      mscbtn.textContent= "⏵"; 
    }
    else{
      msc.play();
      mscbtn.textContent="⏸";
    }
    isplaying=!isplaying;

}
)

