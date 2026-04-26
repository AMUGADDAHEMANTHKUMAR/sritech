import React, { FormEvent, useEffect, useMemo, useState } from 'react';

type AdminTab = 'beginners' | 'professionals' | 'contacts';

interface SheetRecord {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  course?: string;
  message: string;
}

interface GvizCell {
  v?: unknown;
}

interface GvizRow {
  c: Array<GvizCell | null>;
}

interface GvizResponse {
  table: {
    rows: GvizRow[];
  };
}

const ADMIN_PASSWORD = 'sritech@admin2024';
const ADMIN_SESSION_KEY = 'sritech-admin-authenticated';

const SHEET_URLS: Record<AdminTab, string> = {
  beginners: 'https://docs.google.com/spreadsheets/d/1Il79grI54I4et2J4v-66POCiOE5g0QAouNHuN8jndQ8/gviz/tq?tqx=out:json&sheet=Beginners',
  professionals: 'https://docs.google.com/spreadsheets/d/1Il79grI54I4et2J4v-66POCiOE5g0QAouNHuN8jndQ8/gviz/tq?tqx=out:json&sheet=Professionals',
  contacts: 'https://docs.google.com/spreadsheets/d/1Il79grI54I4et2J4v-66POCiOE5g0QAouNHuN8jndQ8/gviz/tq?tqx=out:json&sheet=Contacts'
};

const tabLabels: Record<AdminTab, string> = {
  beginners: 'Beginners',
  professionals: 'Professionals',
  contacts: 'Contacts'
};

function cellToString(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value);
}

function parseRows(text: string): string[][] {
  const json = JSON.parse(text.substring(47).slice(0, -2)) as GvizResponse;
  return json.table.rows.map((row) => row.c.map((cell) => cellToString(cell?.v ?? '')));
}

function mapEnrollmentRow(row: string[]): SheetRecord {
  return {
    timestamp: row[0] ?? '',
    name: row[1] ?? '',
    email: row[2] ?? '',
    phone: row[3] ?? '',
    course: row[4] ?? '',
    message: row[5] ?? ''
  };
}

function mapContactRow(row: string[]): SheetRecord {
  return {
    timestamp: row[0] ?? '',
    name: row[1] ?? '',
    email: row[2] ?? '',
    phone: row[3] ?? '',
    message: row[4] ?? ''
  };
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('beginners');
  const [beginners, setBeginners] = useState<SheetRecord[]>([]);
  const [professionals, setProfessionals] = useState<SheetRecord[]>([]);
  const [contacts, setContacts] = useState<SheetRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const currentRows = useMemo(() => {
    if (activeTab === 'beginners') {
      return beginners;
    }

    if (activeTab === 'professionals') {
      return professionals;
    }

    return contacts;
  }, [activeTab, beginners, contacts, professionals]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    let isMounted = true;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      setFetchError('');

      try {
        const [beginnerText, professionalText, contactText] = await Promise.all([
          fetch(SHEET_URLS.beginners).then((response) => response.text()),
          fetch(SHEET_URLS.professionals).then((response) => response.text()),
          fetch(SHEET_URLS.contacts).then((response) => response.text())
        ]);

        if (!isMounted) {
          return;
        }

        setBeginners(parseRows(beginnerText).map(mapEnrollmentRow));
        setProfessionals(parseRows(professionalText).map(mapEnrollmentRow));
        setContacts(parseRows(contactText).map(mapContactRow));
      } catch (error) {
        if (isMounted) {
          setFetchError('Unable to load dashboard data. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== ADMIN_PASSWORD) {
      setLoginError('Incorrect password. Try again.');
      return;
    }

    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    setIsLoggedIn(true);
    setLoginError('');
    setPassword('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsLoggedIn(false);
    setPassword('');
    setLoginError('');
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-5 py-10 text-white">
        <form onSubmit={handleLogin} className="w-full max-w-md border border-white/15 bg-[#0b0b0b] p-8 md:p-10">
          <p className="mb-8 font-heading text-3xl font-black uppercase tracking-tight text-white">
            SRITECH
          </p>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.35em] text-gray-500">
            Private Access
          </p>
          <h1 className="mb-8 font-heading text-4xl font-black uppercase leading-none text-white md:text-5xl">
            Admin Login
          </h1>

          <label htmlFor="admin-password" className="mb-2 block text-xs font-mono uppercase tracking-wider text-gray-400">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mb-4 h-12 w-full border border-white/15 bg-[#050505] px-4 text-white outline-none transition-colors focus:border-white"
          />
          {loginError && <p className="mb-4 text-sm text-red-400">{loginError}</p>}

          <button
            type="submit"
            className="h-12 w-full border border-white bg-white text-sm font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-transparent hover:text-white"
          >
            Login
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/15 pb-6 md:flex-row md:items-center md:justify-between">
          <h1 className="font-heading text-3xl font-black uppercase leading-none text-white md:text-5xl">
            SRITECH Admin Dashboard
          </h1>
          <button
            type="button"
            onClick={handleLogout}
            className="h-11 border border-white/30 px-6 text-xs font-bold uppercase tracking-[0.25em] text-white transition-colors hover:bg-white hover:text-black"
          >
            Logout
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          {(Object.keys(tabLabels) as AdminTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`h-12 border text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                activeTab === tab
                  ? 'border-white bg-white text-black'
                  : 'border-white/20 text-white hover:border-white'
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="border border-white/15 bg-[#0b0b0b] p-5">
            <p className="mb-2 text-xs font-mono uppercase tracking-widest text-gray-500">Total Beginners</p>
            <p className="font-heading text-4xl font-black text-white">{beginners.length}</p>
          </div>
          <div className="border border-white/15 bg-[#0b0b0b] p-5">
            <p className="mb-2 text-xs font-mono uppercase tracking-widest text-gray-500">Total Professionals</p>
            <p className="font-heading text-4xl font-black text-white">{professionals.length}</p>
          </div>
          <div className="border border-white/15 bg-[#0b0b0b] p-5">
            <p className="mb-2 text-xs font-mono uppercase tracking-widest text-gray-500">Total Contacts</p>
            <p className="font-heading text-4xl font-black text-white">{contacts.length}</p>
          </div>
        </div>

        <div className="overflow-hidden border border-white/15 bg-[#0b0b0b]">
          <div className="border-b border-white/15 p-5">
            <h2 className="font-heading text-2xl font-black uppercase text-white">
              {tabLabels[activeTab]} Data
            </h2>
          </div>

          {isLoading && <p className="p-6 text-gray-400">Loading...</p>}
          {fetchError && !isLoading && <p className="p-6 text-red-400">{fetchError}</p>}
          {!isLoading && !fetchError && currentRows.length === 0 && (
            <p className="p-6 text-gray-400">No data found</p>
          )}

          {!isLoading && !fetchError && currentRows.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                <thead className="bg-[#111] text-xs uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="px-4 py-4">#</th>
                    <th className="px-4 py-4">Timestamp</th>
                    <th className="px-4 py-4">Full Name</th>
                    <th className="px-4 py-4">Email</th>
                    <th className="px-4 py-4">Phone</th>
                    {activeTab !== 'contacts' && <th className="px-4 py-4">Course</th>}
                    <th className="px-4 py-4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, index) => (
                    <tr key={`${activeTab}-${index}-${row.email}-${row.phone}`} className={index % 2 === 0 ? 'bg-[#080808]' : 'bg-[#101010]'}>
                      <td className="px-4 py-4 text-gray-400">{index + 1}</td>
                      <td className="px-4 py-4 text-gray-300">{row.timestamp}</td>
                      <td className="px-4 py-4 text-white">{row.name}</td>
                      <td className="px-4 py-4 text-gray-300">{row.email}</td>
                      <td className="px-4 py-4 text-gray-300">{row.phone}</td>
                      {activeTab !== 'contacts' && <td className="px-4 py-4 text-gray-300">{row.course}</td>}
                      <td className="px-4 py-4 text-gray-300">{row.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
