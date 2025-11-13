import { Version } from "@shared/schema";

export const versionsData: Version[] = [
  {
    id: "2026.2",
    version: "2026.2",
    releaseDate: "2024-11-13",
    features: [
      {
        id: "2026.2-esri",
        title: "Esri Integration Features",
        description: "Enhanced integration with Esri GIS platforms for improved spatial data management and analysis.",
        category: "Integration"
      },
      {
        id: "2026.2-admin",
        title: "Project Administration Tools",
        description: "New administrative features for better project management and collaboration.",
        category: "Administration"
      }
    ]
  },
  {
    id: "2026.1",
    version: "2026.1",
    releaseDate: "2026-06-01",
    features: [
      {
        id: "2026.1-cloud",
        title: "Cloud Capabilities Enhancements",
        description: "Continued improvements to cloud integration that started in version 2024.0, enabling better cloud-based simulations and data management.",
        category: "Cloud"
      },
      {
        id: "2026.1-flood",
        title: "Autodesk InfoWorks ICM Flood",
        description: "New Autodesk product using ICM's hydrological and hydraulic modelling for event-based forecasting and risk assessment for networks up to 1000 nodes. Requires a Flood licence.",
        category: "Product"
      },
      {
        id: "2026.1-sewer-rebrand",
        title: "InfoWorks ICM Standard Rebranded as InfoWorks ICM Sewer",
        description: "The Autodesk product InfoWorks ICM Standard is rebranded as InfoWorks ICM Sewer. The Sewer product still uses a Standard licence and all functionality remains available.",
        category: "Product"
      },
      {
        id: "2026.1-ruby",
        title: "Ruby Scripts as Database Items",
        description: "Ruby scripts can now be added as database items with a new Ruby script editor to add, view, edit, validate syntax, and run scripts directly in the GeoPlan. Can also import external Ruby script files.",
        category: "Development"
      },
      {
        id: "2026.1-ruby-custom",
        title: "Ruby Scripts in Custom Actions",
        description: "Ruby Script database items can now be included in Custom actions, providing more flexible automation workflows.",
        category: "Development"
      },
      {
        id: "2026.1-subgrid-expansion",
        title: "Additional Network Objects for Subgrid Sampling",
        description: "Expanded Subgrid Sampling support to include River Reach - Bank Flows (when connected to 2D zones) and Inline banks (when acting as 1D-2D links).",
        category: "Subgrid Sampling"
      },
      {
        id: "2026.1-swmm-flow",
        title: "Display Improvement for Flow in SWMM Nodes",
        description: "Increased precision for node's Baseline inflow, Base flow, and Base flow for Additional DWF properties from 3 to 5 when using metric units.",
        category: "SWMM"
      },
      {
        id: "2026.1-swmm-stage-flow",
        title: "Importing InfoSWMM Stage-Flow Outfalls to SWMM Networks",
        description: "Stage-Flow type outfalls from InfoSWMM can now be imported to ICM SWMM networks as SWMM nodes with Free type output.",
        category: "SWMM"
      },
      {
        id: "2026.1-swmm-rating",
        title: "Importing InfoSWMM Rating Curve Outlets to SWMM Networks",
        description: "Outlets with Tabular Inflow-Outflow rating curves from InfoSWMM can now be imported as Outlet types with Functional/Depth Rating curves.",
        category: "SWMM"
      },
      {
        id: "2026.1-operator-client",
        title: "Autodesk ICMLive Operator Client for InfoWorks ICM Flood",
        description: "ICMLive Operator Client is installed with Autodesk InfoWorks ICM Flood, allowing Flood users to view areas of interest, see alerts, and analyze live run results.",
        category: "ICMLive"
      }
    ]
  },
  {
    id: "2026.0",
    version: "2026.0",
    releaseDate: "2025-04-01",
    features: [
      {
        id: "2026.0-cloud",
        title: "Cloud Capabilities Enhancements",
        description: "Continued improvements to cloud integration that started in version 2024.0.",
        category: "Cloud"
      },
      {
        id: "2026.0-subgrid",
        title: "Subgrid Sampling Technical Preview",
        description: "New method for enhancing topographic representation in InfoWorks 2D models with finer triangular mesh for each 2D element. Improves predictive ability without compromising performance or accuracy.",
        category: "Subgrid Sampling"
      },
      {
        id: "2026.0-subgrid-results",
        title: "Subgrid Sampling Results",
        description: "New results available for 2D zones with Subgrid Sampling: Mean depth, Volume (time-varying and summary), and Subgrid flag. Includes support for Network Results Point 2D objects.",
        category: "Subgrid Sampling"
      },
      {
        id: "2026.0-icmlive",
        title: "ICMLive for Autodesk InfoWorks ICM Ultimate",
        description: "ICMLive functionality now available in ICM Ultimate to convert hydrologic and hydraulic network models into near real-time forecasting systems. Includes Live groups, Action Lists, Alert Definition Lists, Manifests, and Manifest Deployments.",
        category: "ICMLive"
      },
      {
        id: "2026.0-operator",
        title: "Autodesk ICMLive Operator Client",
        description: "Now installed with Autodesk InfoWorks ICM as part of the ICMLive system for viewing and operating live simulations.",
        category: "ICMLive"
      },
      {
        id: "2026.0-swmm-validation",
        title: "SWMM Network Validation Performance",
        description: "Validation for SWMM networks with maximum depth set for Junction or Storage nodes is now significantly quicker.",
        category: "SWMM"
      },
      {
        id: "2026.0-tsd",
        title: "TSD Background Updates",
        description: "Updates of Scalar or Spatial time series data (TSD) can now be performed by InfoWorks ICM as a background process.",
        category: "Data Management"
      },
      {
        id: "2026.0-analytics",
        title: "Desktop Analytics Privacy Settings",
        description: "New Privacy Settings dialog for 64-bit versions (existing Data Collection dialog for 32-bit) to control usage analysis and help improve software quality.",
        category: "Administration"
      },
      {
        id: "2026.0-geoplan-perf",
        title: "GeoPlan Performance Improvements for 2D Meshes",
        description: "Improved GeoPlan performance when displaying large 2D meshes, with faster pan, zoom, and properties tools.",
        category: "Performance"
      },
      {
        id: "2026.0-cuda",
        title: "CUDA Update to 12.6.3",
        description: "Updated to CUDA 12.6.3. NVIDIA drivers may need updating for compatibility. Only cards with compute capability 5.0 or higher supported.",
        category: "System"
      }
    ]
  },
  {
    id: "2025.4",
    version: "2025.4",
    releaseDate: "2024-10-01",
    features: [
      {
        id: "2025.4-viewer",
        title: "Autodesk InfoWorks ICM Viewer",
        description: "New viewer allowing users to view model data and analyze existing results without needing an Autodesk licence, only an Autodesk account required.",
        category: "Product"
      },
      {
        id: "2025.4-2d-histogram",
        title: "2D Mesh Element Histograms",
        description: "New feature to identify 2D mesh element areas smaller than specified minimum element size, helping detect model instability and simulation performance issues.",
        category: "Meshing"
      },
      {
        id: "2025.4-results-element",
        title: "Results element 2D objects",
        description: "Results Analysis database items can now contain read-only Results element 2D objects automatically generated from 2D Mesh Element Histogram for mesh inspection.",
        category: "Results"
      },
      {
        id: "2025.4-swmm-results",
        title: "Results analysis for SWMM networks",
        description: "Result analysis items now available for SWMM networks with Results point, line, polygon objects and Results element objects for 2D mesh interrogation.",
        category: "SWMM"
      },
      {
        id: "2025.4-muskingum",
        title: "Muskingum output routing method for InfoWorks subcatchments",
        description: "New Muskingum routing option for subcatchment outflow through notional reach with travel time and discharge weighting factor.",
        category: "Hydrology"
      },
      {
        id: "2025.4-rpa-export",
        title: "Exporting Return Period Analysis grid report to CSV",
        description: "New Export CSV button added to RPA report view for exporting results data to CSV files.",
        category: "Results"
      },
      {
        id: "2025.4-ruby-rpa",
        title: "Exporting RPA data to CSV using Ruby scripting",
        description: "New rpa_export Ruby script method for programmatically exporting RPA results to CSV.",
        category: "Development"
      },
      {
        id: "2025.4-ruby-rainfall",
        title: "Adding design rainfall events using Ruby scripting",
        description: "New new_synthetic_rainfall Ruby method for adding design rainfall events to models programmatically.",
        category: "Development"
      },
      {
        id: "2025.4-ruby-tsd",
        title: "Adding TSD objects using Ruby scripting",
        description: "New WSTSDObject class for adding TSD objects to database and accessing time series data via WSOpenTSD class methods.",
        category: "Development"
      },
      {
        id: "2025.4-state-performance",
        title: "State file initialisation time improvement",
        description: "Loading state files from simulations with different 2D meshes now 10-15 times faster, reducing initialisation time significantly.",
        category: "Performance"
      }
    ]
  },
  {
    id: "2025.3",
    version: "2025.3",
    releaseDate: "2024-09-01",
    features: [
      {
        id: "2025.3-placeholder",
        title: "Version 2025.3 Features",
        description: "Features for version 2025.3 - September 2024. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2025.2",
    version: "2025.2",
    releaseDate: "2024-07-01",
    features: [
      {
        id: "2025.2-placeholder",
        title: "Version 2025.2 Features",
        description: "Features for version 2025.2 - July 2024. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2025.1",
    version: "2025.1",
    releaseDate: "2024-05-01",
    features: [
      {
        id: "2025.1-placeholder",
        title: "Version 2025.1 Features",
        description: "Features for version 2025.1 - May 2024. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2025.0",
    version: "2025.0",
    releaseDate: "2024-04-01",
    features: [
      {
        id: "2025.0-placeholder",
        title: "Version 2025.0 Features",
        description: "Features for version 2025.0 - April 2024. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2025.5",
    version: "2025.5",
    releaseDate: "2024-11-01",
    features: [
      {
        id: "2025.5-cloud",
        title: "Cloud Capabilities Enhancements",
        description: "Continued improvements to cloud integration that started in version 2024.0.",
        category: "Cloud"
      },
      {
        id: "2025.5-copy-results",
        title: "Copying Cloud Simulation Results",
        description: "Can now copy simulation results from cloud database runs (with full results downloaded) to transportable database version 2024.5 or newer. Enables sharing results between cloud and on-premise databases.",
        category: "Cloud"
      },
      {
        id: "2025.5-risk",
        title: "Risk Analysis Runs for Cloud Databases",
        description: "Risk analysis run objects can now be added to cloud databases. Simulations run on-premise but leverage cloud database infrastructure. Includes support for Damage functions, Damage receptors, and Risk impact zones.",
        category: "Cloud"
      },
      {
        id: "2025.5-netcdf",
        title: "NetCDF File Formats for Spatial TSD Objects",
        description: "Extended support for NetCDF source projection formats. Data on Latitude Longitude grid with WGS84 datum can be imported using NetCDF AUS.BOM option.",
        category: "Data Management"
      }
    ]
  },
  {
    id: "2024.4",
    version: "2024.4",
    releaseDate: "2023-11-01",
    features: [
      {
        id: "2024.4-placeholder",
        title: "Version 2024.4 Features",
        description: "Features for version 2024.4 - November 2023. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2024.3",
    version: "2024.3",
    releaseDate: "2023-09-01",
    features: [
      {
        id: "2024.3-placeholder",
        title: "Version 2024.3 Features",
        description: "Features for version 2024.3 - September 2023. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2024.5",
    version: "2024.5",
    releaseDate: "2024-01-01",
    features: [
      {
        id: "2024.5-cloud",
        title: "Cloud Capabilities Enhancements",
        description: "Continued improvements to cloud integration that started in version 2024.0.",
        category: "Cloud"
      },
      {
        id: "2024.5-download-choice",
        title: "Choose Simulation Results Download Type",
        description: "New Download Cloud Results dialog lets you select which type of results to automatically download (full or summary) when simulations complete. Full results always remain available in the cloud.",
        category: "Cloud"
      },
      {
        id: "2024.5-download-options",
        title: "Additional Download Options for Cloud Results",
        description: "More flexible result downloading: batch download for multiple simulations, right-click download options for full or summary results, and upgrade summary results to full results.",
        category: "Cloud"
      },
      {
        id: "2024.5-delete-results",
        title: "Deleting Results for Cloud Simulations",
        description: "Two new deletion options: Delete all local results and Delete local non-summary results. Full results remain available for download from cloud.",
        category: "Cloud"
      },
      {
        id: "2024.5-exchange-download",
        title: "Downloading Results Using ICM Exchange",
        description: "New WSApplication.launch_sims_ex method with additional options including RunOn and DownloadSelection. WSSimObject run_ex method has new DownloadSelection key.",
        category: "Integration"
      },
      {
        id: "2024.5-rafts",
        title: "Increased Values for Equivalent Manning's n",
        description: "RAFTS routing model limits for Equivalent Manning's n increased from 0.01-0.1 to 0.001-2.0. Values above 0.25 trigger warnings. PERN values for >0.1 found by linear extrapolation.",
        category: "Hydrology"
      }
    ]
  },
  {
    id: "2024.1",
    version: "2024.1",
    releaseDate: "2023-05-01",
    features: [
      {
        id: "2024.1-placeholder",
        title: "Version 2024.1 Features",
        description: "Features for version 2024.1. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2024.0",
    version: "2024.0",
    releaseDate: "2023-04-01",
    features: [
      {
        id: "2024.0-placeholder",
        title: "Version 2024.0 Features - Cloud Capabilities Introduction",
        description: "Features for version 2024.0 - introduced cloud integration. Please provide the full 'What's New' content to populate this version.",
        category: "Cloud"
      }
    ]
  },
  {
    id: "11.0",
    version: "11.0",
    releaseDate: "2020-05-01",
    features: [
      {
        id: "11.0-placeholder",
        title: "Version 11.0 Features",
        description: "Features for version 11.0 - May 2020. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "10.5",
    version: "10.5",
    releaseDate: "2019-12-01",
    features: [
      {
        id: "10.5-placeholder",
        title: "Version 10.5 Features",
        description: "Features for version 10.5 - December 2019. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "10.0",
    version: "10.0",
    releaseDate: "2019-05-01",
    features: [
      {
        id: "10.0-placeholder",
        title: "Version 10.0 Features",
        description: "Features for version 10.0 - May 2019. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "9.5",
    version: "9.5",
    releaseDate: "2018-11-01",
    features: [
      {
        id: "9.5-placeholder",
        title: "Version 9.5 Features",
        description: "Features for version 9.5 - November 2018. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "9.0",
    version: "9.0",
    releaseDate: "2018-05-01",
    features: [
      {
        id: "9.0-placeholder",
        title: "Version 9.0 Features",
        description: "Features for version 9.0 - May 2018. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "2.0",
    version: "2.0",
    releaseDate: "2011-08-01",
    features: [
      {
        id: "2.0-placeholder",
        title: "Version 2.0 Features",
        description: "Features for version 2.0 - August 2011. Please provide the full 'What's New' content to populate this version.",
        category: "General"
      }
    ]
  },
  {
    id: "1.5",
    version: "1.5",
    releaseDate: "2011-02-01",
    features: [
      {
        id: "1.5-3d-display",
        title: "3D Network Window Display Improvements",
        description: "Enhanced 3D visualization with improved bridge opening display (holes cut into bridge faces) and 2D mesh elements now drawn as horizontal elements with risers for accurate representation.",
        category: "Visualization"
      },
      {
        id: "1.5-skew-bridges",
        title: "Skew Bridges",
        description: "New fields added for modeling skew bridges including Skew angle field for bridge deck angle specification and Skew openings and piers field for opening orientation.",
        category: "Modeling"
      },
      {
        id: "1.5-2d-infiltration",
        title: "2D Infiltration Model",
        description: "New 2D infiltration model allowing soil infiltration modeling in previously impervious 2D zones using Infiltration Surface objects with constant, fixed, or Horton infiltration models.",
        category: "Hydrology"
      },
      {
        id: "1.5-water-quality",
        title: "Enhanced Water Quality Modeling",
        description: "Water quality modeling now available in 2D networks with advection and diffusion of pollutants from river banks, manholes, point sources, and external boundaries. Water Quality Model also updated to support non-prismatic conduits including river reaches and bridges.",
        category: "Water Quality"
      },
      {
        id: "1.5-isis-import",
        title: "ISIS .dat File Import",
        description: "Limited support added for importing network data from ISIS .dat files including river section data and spill data with geo-referencing.",
        category: "Data Management"
      },
      {
        id: "1.5-river-reach-tools",
        title: "River Reach Building Improvements",
        description: "Major enhancements including renamed objects (Cross Section Lines, Bank Lines), editable/uneditable river data options, automatic roughness updates, cross section line generation, and join reaches tool.",
        category: "Modeling"
      },
      {
        id: "1.5-interpolation",
        title: "Enhanced Interpolation Tool",
        description: "Improved section interpolation with support for multiple sections and custom chords to map specific features between sections for better accuracy.",
        category: "Modeling"
      },
      {
        id: "1.5-section-highlighting",
        title: "Section Highlighting on GeoPlan",
        description: "River and bridge sections now temporarily highlighted on GeoPlan when opening section editors, improving usability for object identification.",
        category: "Usability"
      },
      {
        id: "1.5-polygon-tools",
        title: "Enhanced Polygon Tools",
        description: "Ability to change line/polygon types, improved crop overlapping polygons functionality supporting river reaches, bridges, storage areas, and complex polygons.",
        category: "Modeling"
      },
      {
        id: "1.5-mesh-diagnostics",
        title: "2D Mesh Diagnostics and Improvements",
        description: "New read-only Mesh summary field storing meshing information and validation warnings. Better handling of undefined elevation areas with error reporting, and element adjustment at river banks now performed during meshing instead of simulation time.",
        category: "Meshing"
      },
      {
        id: "1.5-mesh-manholes",
        title: "Improved Meshing at Manholes",
        description: "Mesh triangles now aggregated at 2D manholes with new 2D element area factor field to reduce water balance problems and improve stability.",
        category: "Meshing"
      },
      {
        id: "1.5-ground-model-display",
        title: "Ground Model Display in Section Editors",
        description: "Ground Model trace can now be displayed on all property sheet section editors when ground model is loaded onto GeoPlan.",
        category: "Visualization"
      },
      {
        id: "1.5-sql-enhancements",
        title: "SQL Enhancements",
        description: "Major SQL improvements including ORDER BY clause, DISTINCT keyword, INSERT clause, new date/trigonometric functions, object ID field support, and flags as arrays.",
        category: "Development"
      },
      {
        id: "1.5-explorer-improvements",
        title: "Explorer Window Enhancements",
        description: "Multiple improvements including version control in Find pane, ID column display, enhanced Model Group icons, and image-enhanced object creation menu.",
        category: "Usability"
      },
      {
        id: "1.5-theme-management",
        title: "Improved Theme Management",
        description: "Layer Theme Editor enhanced to allow quick addition/removal of multiple theme ranges by holding down buttons.",
        category: "Usability"
      },
      {
        id: "1.5-area-measurement",
        title: "Area Measurement Tool",
        description: "Distance Estimation Tool enhanced to measure area in addition to length using polygon formation with CTRL+double-click.",
        category: "Tools"
      },
      {
        id: "1.5-data-flags",
        title: "Enhanced Data Flag System",
        description: "Data flag codes increased from two to four characters, plus new Find and Replace Flags functionality for updating imported network flagging systems.",
        category: "Data Management"
      },
      {
        id: "1.5-selection-tools",
        title: "Selection Tool Improvements",
        description: "Double-click now displays property sheets for multiple overlapping objects, works in Long Section and 3D windows, plus Backspace shortcut to clear selections.",
        category: "Usability"
      },
      {
        id: "1.5-version-control",
        title: "Version Control Enhancements",
        description: "Optional filters in Comparison dialog (Ignore flags, Ignore defaults, Use display precision) and ability to copy commit history to clipboard.",
        category: "Version Control"
      },
      {
        id: "1.5-geoplan-improvements",
        title: "GeoPlan Enhancements",
        description: "Customizable GIS layer selection color, improved network object deletion controls with security options, and improved GeoPlan properties/themes saving.",
        category: "Usability"
      },
      {
        id: "1.5-access-import",
        title: "Enhanced Access Database Import",
        description: "Queries now available for selection in Feature dropdown list of Open Data Import Centre dialog alongside tables.",
        category: "Data Management"
      },
      {
        id: "1.5-gridded-ground-model",
        title: "Gridded Ground Model Import",
        description: "Support for importing gridded ground models from InfoWorks format .IGM files.",
        category: "Data Management"
      },
      {
        id: "1.5-user-permissions",
        title: "Emergency Reset of User Permissions",
        description: "Ability to reset user permissions for a master database and add users as administrators via emergency reset file from Innovyze.",
        category: "Administration"
      },
      {
        id: "1.5-google-earth",
        title: "Google Earth Export Enhancement",
        description: "New option to export only the currently displayed timestep when exporting to Google Earth KMZ format.",
        category: "Integration"
      }
    ]
  }
];
